const labels = require('./labels');

module.exports = function quickLinksSections({
  path: currentPath,
  targetLocale,
}) {
  const completeBeginners = [
    {
      path: `/${targetLocale}/docs/Learn/Getting_started_with_the_web/JavaScript_basics`,
      title: labels['Basics'],
    },
    {
      path: `/${targetLocale}/docs/Learn/JavaScript/First_steps`,
      title: labels['First_steps'],
    },
    {
      path: `/${targetLocale}/docs/Learn/JavaScript/Building_blocks`,
      title: labels['Building_blocks'],
    },
    {
      path: `/${targetLocale}/docs/Learn/JavaScript/Objects`,
      title: labels['Introducing_objects'],
    },
  ];

  const guide = [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Introduction`,
      title: labels['Guide_Introduction'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Grammar_and_Types`,
      title: labels['Guide_Grammar'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Control_flow_and_error_handling`,
      title: labels['Guide_Control_flow'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Loops_and_iteration`,
      title: labels['Guide_Loops'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Functions`,
      title: labels['Guide_Functions'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Expressions_and_Operators`,
      title: labels['Guide_Expressions'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Numbers_and_dates`,
      title: labels['Guide_Numbers'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Text_formatting`,
      title: labels['Guide_Text'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Regular_Expressions`,
      title: labels['Guide_RegExp'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Indexed_collections`,
      title: labels['Guide_Indexed_collections'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Keyed_collections`,
      title: labels['Guide_keyed_collections'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Working_with_Objects`,
      title: labels['Guide_Objects'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Details_of_the_Object_Model`,
      title: labels['Guide_OOP'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Using_promises`,
      title: labels['Guide_promises'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Iterators_and_generators`,
      title: labels['Guide_Iterators_Generators'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Meta_programming`,
      title: labels['Guide_Meta'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Guide/Modules`,
      title: labels['Guide_Modules'],
    },
  ];

  const intermediate = [
    {
      path: `/${targetLocale}/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks`,
      title: labels['Frameworks'],
    },
    {
      path: `/${targetLocale}/docs/Learn/JavaScript/Client-side_web_APIs`,
      title: labels['Client-side_APIs'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/A_re-introduction_to_JavaScript`,
      title: labels['Re-introduction'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Data_structures`,
      title: labels['Data_structures'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Equality_comparisons_and_sameness`,
      title: labels['Equality'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Closures`,
      title: labels['Closures'],
    },
  ];

  const advanced = [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Inheritance_and_the_prototype_chain`,
      title: labels['Inheritance'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Strict_mode`,
      title: labels['Strict_mode'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Typed_arrays`,
      title: labels['Typed_arrays'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Memory_Management`,
      title: labels['Memory_Management'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/EventLoop`,
      title: labels['Event_Loop'],
    },
  ];

  return [
    {
      title: labels['Complete_beginners'],
      items: completeBeginners,
      expanded: completeBeginners.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Guide'],
      items: guide,
      expanded: guide.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Intermediate'],
      items: intermediate,
      expanded: intermediate.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Advanced'],
      items: advanced,
      expanded: advanced.find(({ path }) => path === currentPath),
    },
  ];
};
