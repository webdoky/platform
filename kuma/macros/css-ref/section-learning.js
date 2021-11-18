const labels = require('./labels');

module.exports = function learningSections({
  path: currentPath,
  targetLocale,
}) {
  const learnURL = `/${targetLocale}/docs/Learn/CSS/`;

  const firstStepsItems = [
    {
      path: `${learnURL}First_steps`,
      title: labels['CSS_first_steps_overview'],
    },
    {
      path: `${learnURL}First_steps/What_is_CSS`,
      title: labels['What_is_CSS'],
    },
    {
      path: `${learnURL}First_steps/Getting_started`,
      title: labels['Getting_started_with_CSS'],
    },
    {
      path: `${learnURL}First_steps/How_CSS_is_structured`,
      title: labels['How_CSS_is_structured'],
    },
    {
      path: `${learnURL}First_steps/How_CSS_works`,
      title: labels['How_CSS_works'],
    },
    {
      path: `${learnURL}First_steps/Using_your_new_knowledge`,
      title: labels['Using_your_new_knowledge'],
    },
  ];

  const buildingBlocks = [
    {
      path: `${learnURL}Building_blocks`,
      title: labels['CSS_building_blocks_overview'],
    },
    {
      path: `${learnURL}Building_blocks/Cascade_and_inheritance`,
      title: labels['Cascade_and_inheritance'],
    },
    {
      path: `${learnURL}Building_blocks/Selectors`,
      title: labels['CSS_selectors'],
    },
    {
      path: `${learnURL}Building_blocks/The_box_model`,
      title: labels['The_box_model'],
    },
    {
      path: `${learnURL}Building_blocks/Backgrounds_and_borders`,
      title: labels['Backgrounds_and_borders'],
    },
    {
      path: `${learnURL}Building_blocks/Handling_different_text_directions`,
      title: labels['Handling_different_text_directions'],
    },
    {
      path: `${learnURL}Building_blocks/Overflowing_content`,
      title: labels['Overflowing_content'],
    },
    {
      path: `${learnURL}Building_blocks/Values_and_units`,
      title: labels['Values_and_units'],
    },
    {
      path: `${learnURL}Building_blocks/Sizing_items_in_CSS`,
      title: labels['Sizing_items_in_CSS'],
    },
    {
      path: `${learnURL}Building_blocks/Images_media_form_elements`,
      title: labels['Images_media_and_form_elements'],
    },
    {
      path: `${learnURL}Building_blocks/Styling_tables`,
      title: labels['Styling_tables'],
    },
    {
      path: `${learnURL}Building_blocks/Debugging_CSS`,
      title: labels['Debugging_CSS'],
    },
    {
      path: `${learnURL}Building_blocks/Organizing`,
      title: labels['Organizing_your_CSS'],
    },
  ];

  const stylingText = [
    {
      path: `${learnURL}Styling_text`,
      title: labels['Styling_text_overview'],
    },
    {
      path: `${learnURL}Styling_text/Fundamentals`,
      title: labels['Fundamental_text_and_font_styling'],
    },
    {
      path: `${learnURL}Styling_text/Styling_lists`,
      title: labels['Styling_lists'],
    },
    {
      path: `${learnURL}Styling_text/Styling_links`,
      title: labels['Styling_links'],
    },
    {
      path: `${learnURL}Styling_text/Web_fonts`,
      title: labels['Web_fonts'],
    },
    {
      path: `${learnURL}Styling_text/Typesetting_a_homepage`,
      title: labels['Assessment_typesetting_a_community_school_homepage'],
    },
  ];

  const cssLayout = [
    {
      path: `${learnURL}CSS_layout`,
      title: labels['CSS_layout_overview'],
    },
    {
      path: `${learnURL}CSS_layout/Introduction`,
      title: labels['Layout_introduction'],
    },
    {
      path: `${learnURL}CSS_layout/Normal_Flow`,
      title: labels['Normal_Flow'],
    },
    {
      path: `${learnURL}CSS_layout/Flexbox`,
      title: labels['Flexbox'],
    },
    {
      path: `${learnURL}CSS_layout/Grids`,
      title: labels['Grids'],
    },
    {
      path: `${learnURL}CSS_layout/Floats`,
      title: labels['Floats'],
    },
    {
      path: `${learnURL}CSS_layout/Positioning`,
      title: labels['Positioning'],
    },
    {
      path: `${learnURL}CSS_layout/Multiple-column_Layout`,
      title: labels['Multiple-column_Layout'],
    },
    {
      path: `${learnURL}CSS_layout/Responsive_Design`,
      title: labels['Responsive_design'],
    },
    {
      path: `${learnURL}CSS_layout/Media_queries`,
      title: labels['Media_queries'],
    },
    {
      path: `${learnURL}CSS_layout/Legacy_Layout_Methods`,
      title: labels['Legacy_Layout_Methods'],
    },
    {
      path: `${learnURL}CSS_layout/Supporting_Older_Browsers`,
      title: labels['Supporting_Older_Browsers'],
    },
    {
      path: `${learnURL}CSS_layout/Fundamental_Layout_Comprehension`,
      title: labels['Fundamental_Layout_Comprehension'],
    },
  ];

  const pageToNavItem = ({ path, title }) => ({
    title,
    path,
    isCurrent: path === currentPath,
  });

  return [
    {
      title: labels['CSS_first_steps'],
      items: firstStepsItems.map(pageToNavItem),
      expanded: !!firstStepsItems.find(({ path }) => path === currentPath),
    },
    {
      title: labels['CSS_building_blocks'],
      items: buildingBlocks.map(pageToNavItem),
      expanded: !!buildingBlocks.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Styling_text'],
      items: stylingText.map(pageToNavItem),
      expanded: !!stylingText.find(({ path }) => path === currentPath),
    },
    {
      title: labels['CSS_layout'],
      items: cssLayout.map(pageToNavItem),
      expanded: !!cssLayout.find(({ path }) => path === currentPath),
    },
  ];
};
