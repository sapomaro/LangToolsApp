window.DuplicateWordsApp.DictionaryModule = function(lang) {
  "use strict";
  
  if (lang !== 'ru') {
    return null;
  }

  var dict = {};
  
  var parseMorphemes = function(line) { // преобразует части слов в упорядоченный массив
    return line.replace(/ё/g, 'е')
      .replace(/^[^а-яё]+/, '')
      .replace(/[^а-яё]+$/, '')
      .split(/[^а-яё]+/)
      .sort(function(a, b) { return a.length - b.length; });
  };
  
  /*  СПОРНЫЕ СЛУЧАИ: 
      делить - делать - разделяемый - деловой - Нью-Дели
      идет - идея
      последний - последствия
      снег - снежный
      тема - темный
      вместо - вместе
      подсказка - высказать (?)
      формат - форма - оформленный (?)
      уходить - расходный (?)
      распад - подпадает (?)
      состояние - противостояние (?)
  */
  
  // повторы, которые могут не учитываться
  dict.exceptions = 'из, за, на, не, ни, по, бы, до, от, для, под, над'; 
  
  dict.immutableRoots = 'назад, никто, пока, ради, там, так, как, кто, что, раз, вне, при';
  
  dict.unbreakableRoots = parseMorphemes( // проблемные корни, которые могут быть неверно разбиты
    'ваш, век, вер, вес, вид, вод, вред, вечер, власт, вопрос, войн, втор, '+
    'восто, возраж, '+
    'газон, дел, доход, доступ, доклад, долж, '+ 
    'закон, заслон, запад, задач, '+
    'июн, июл, истор, име, иде, ' +
    'крат, крыл, мыш, мир, начал, начин, недел, наш, '+
    'област, образ, остров, отраж, обреч, особ, '+
    'пут, пора, получ, полн, прав, правл, правил, проект, прост, постав, '+
    'процесс, преступ, планет, полит, послед, продолж, предел, повестк, '+
    'провер, предлож, пространств, приним, призна, '+
    'рад, развит, разработ, '+
    'сид, свиде, след, слов, случ, стран, сил, систем, средств, стол, столиц, сведен, '+ 
    'сторон, связ, ситуац, союз, совет, стат, суверен, содерж, соверш, свет, слон, '+
    'состоя, '+
    'тиш, тест, точк, толк, '+
    'удел, устав, услов, участ, уваж, уступ, улиц, указ, формул'
  ); 

  dict.prefixes = parseMorphemes(
    'в-, во-, взо-, вне-, внутри-, возо-, вы-, до-, еже-, за-, зако-,'+
    'изо-, испод-, к-, кое-, ку-, меж-, междо-, между-, на-, над-, надо-, '+
    'наи-, не-, недо-, ни-, низо-, о-, об-, обо-, около-, от-, ото-, па-, '+
    'пере-, по-, под-, подо-, поза-, после-, пра-, пред-, преди-, предо-, про-,'+
    'противо-, разо-, с-, со-, сверх-, среди-, су-, тре-, у-, без-, бес-, вз-,'+
    'вс-, воз-, вос-, из-, ис-, низ-, нис-, обез-, обес-, раз-, рас-, роз-, рос-,'+
    'через-, черес-, чрез-, чрес-, пре-, при-, зло-, взаимо-, псевдо-, анти-, гео-,'+
    'везде-, много-, одно-, неодно-, дву-, двух'
  );

  dict.suffixes = parseMorphemes( 
    '-айш-, -е-, -ее-, -ей-, -ейш-, -же-, -ше-, -л-, -ел-, -ти, -ть, -и, -ащ-,'+
    '-ящ-, -вш-, -ш-, -ущ-, -ющ-, -ем-, -им-, -ом-, -нн-, -енн-, -онн-, -т-, -ить, -а-, -я-,'+
    '-учи-, -ючи-, -вши-, -ши-, -ес-, -ен-, -ер-, -й-, -ейш-, -айш-, -к-, -ик-, '+
    '-ек-, -ок-, -чик, -ёк-, -еньк-, -оньк-, -ечк-, -ичк-, -ич-, -очк-, -ашк-, -ашн-, -ишк-, -ашек-'+
    '-ушк-, -юшк-, -ышк-, -ец-, -иц-, -енк-, -инк-, -онк-, -ин-, -ищ-, -ушек, -ышек,'+
    '-ёныш, -еньк-, -оньк-, -ехоньк-, -оханьк-, -ёшеньк-, -ошеньк-, -ущ-, -ющ-, '+
    '-юсеньк-, -енн-, -оват-, -еньк-, -оньк-, -енечко, -онечко, -еват, -оват, -тель, '+
    '-чик, -щик, -ник, -ир, -ниц-, -к-, -иц-, -юх, -ёнок, -ушк-, -ышк-, -ость, -ост-, -як, -ун, -ач, '+
    '-ущ-, -ив-, -ивн-, -чив-, -лив-, -ист-, -изм-, -ск-, -еск-, -ов-, -ев-, -н-, -евит-, -ин-, '+
    '-ова-, -ева-, -ыва-, -и-, -я-, -е-, -а-, -а, -о, -у, -ийск-, -ств-, -еств, -арн-, -арик, -ац-,'+
    '-от-, -лог, -ь, '+
    '-чн-, -ованность, '
  ); // , -ход

  dict.endings = parseMorphemes( 
    '-а, -ам, -ами, -ас, -ах, -ая, -е, -её, -ей, -ем, -еми, -емя,'+
    '-ех, -ею, -ёт, -ёте, -ёх, -ёшь, -и, -ие, -ий, -ия, -им, -ими, -ит,'+
    '-ите, -их, -ишь, -ию, -ми, -мя, -о, -ов, -ого, -ое, -оё,'+
    '-ой, -ом, -ому, -ою, -у, -ум, -умя, -ут, -ух, -ую, -шь, -ый, -ые'+
    '-а, -я, -ы, -и, -ов, -ей, -е, -ам, -ям, -у, -ю,'+ // сущ. и.м.-в.п.
    '-ой, -ёй, -ами, -ями, -ом, -ем, -ём, -ах, -ях,'+ // сущ. т.п.-п.п.
    '-у, -ю, -ешь, -ет, -ем, -ете, -ут, -ют, -ишь, -ит, -им, -ите, -ат, -ят,'+ // гл. 1/2 спряж.
    '-ый, -ий, -ая, -яя, -ое, -ее, -ые, -ие, -ого, -его, -ой, -ей, -ых, -их,'+ // прил. им./род.п.
    '-ому, -ему, -ой, -ей, -ым, -им, -ую, -юю, -ыми, -ими, -ом, -ем' // прил. дат./вин./твор.п.
    // убрано: -м, 
  ); 

  return dict;
};