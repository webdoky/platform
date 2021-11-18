const labels = require('./labels');

module.exports = function guidesSections({ path: currentPath, targetLocale }) {
  const webCssURL = `/${targetLocale}/docs/Web/CSS/`;

  const animationsSections = [
    {
      path: `${webCssURL}CSS_Animations/Using_CSS_animations`,
      title: labels['Using CSS animations'],
    },
  ];

  const backgroundsAndBorders = [
    {
      path: `${webCssURL}CSS_Backgrounds_and_Borders/Using_multiple_backgrounds`,
      title: labels['Using multiple backgrounds'],
    },
    {
      path: `${webCssURL}CSS_Backgrounds_and_Borders/Resizing_background_images`,
      title: labels['Resizing background images'],
    },
  ];

  const boxAlignment = [
    {
      path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_In_Block_Abspos_Tables`,
      title: labels['Box alignment in block layout'],
    },
    {
      path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_in_Flexbox`,
      title: labels['Box alignment in flexbox'],
    },
    {
      path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_In_Grid_Layout`,
      title: labels['Box alignment in grid layout'],
    },
    {
      path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_in_Multi-column_Layout`,
      title: labels['Box alignment in multi-column layout'],
    },
  ];

  const boxModel = [
    {
      path: `${webCssURL}CSS_Box_Model/Introduction_to_the_CSS_box_model`,
      title: labels['Introduction to the CSS basic box model'],
    },
    {
      path: `${webCssURL}CSS_Box_Model/Mastering_margin_collapsing`,
      title: labels['Mastering margin collapsing'],
    },
  ];

  const columns = [
    {
      path: `${webCssURL}CSS_Columns/Basic_Concepts_of_Multicol`,
      title: labels['Basic concepts of Multicol'],
    },
    {
      path: `${webCssURL}CSS_Columns/Styling_Columns`,
      title: labels['Styling columns'],
    },
    {
      path: `${webCssURL}CSS_Columns/Spanning_Columns`,
      title: labels['Spanning and balancing'],
    },
    {
      path: `${webCssURL}CSS_Columns/Handling_Overflow_in_Multicol`,
      title: labels['Handling overflow in Multicol'],
    },
    {
      path: `${webCssURL}CSS_Columns/Handling_content_breaks_in_multicol`,
      title: labels['Content breaks in Multicol'],
    },
  ];

  const cssomView = [
    {
      path: `${webCssURL}CSSOM_View/Coordinate_systems`,
      title: labels['Coordinate systems'],
    },
  ];

  const flexbox = [
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox`,
      title: labels['Basic concepts of Flexbox'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Relationship_of_Flexbox_to_Other_Layout_Methods`,
      title: labels['Comparison with other layout methods'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container`,
      title: labels['Aligning items in a flex container'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Ordering_Flex_Items`,
      title: labels['Ordering flex items'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax`,
      title: labels['Controlling flex item ratios'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items`,
      title: labels['Mastering wrapping of flex items'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox`,
      title: labels['Typical use cases of Flexbox'],
    },
    {
      path: `${webCssURL}CSS_Flexible_Box_Layout/Backwards_Compatibility_of_Flexbox`,
      title: labels['Backwards compatibility of Flexbox'],
    },
  ];

  const flowLayout = [
    {
      path: `${webCssURL}CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow`,
      title: labels['Block and Inline layout in normal flow'],
    },
    {
      path: `${webCssURL}CSS_Flow_Layout/In_Flow_and_Out_of_Flow`,
      title: labels['In flow and Out of flow'],
    },
    {
      path: `${webCssURL}CSS_Flow_Layout/Intro_to_formatting_contexts`,
      title: labels['Formatting contexts explained'],
    },
    {
      path: `${webCssURL}CSS_Flow_Layout/Flow_Layout_and_Writing_Modes`,
      title: labels['Flow layout and writing modes'],
    },
    {
      path: `${webCssURL}CSS_Flow_Layout/Flow_Layout_and_Overflow`,
      title: labels['Flow layout and overflow'],
    },
  ];

  const fonts = [
    {
      path: `${webCssURL}CSS_Fonts/OpenType_fonts_guide`,
      title: labels['OpenType font features guide'],
    },
    {
      path: `${webCssURL}CSS_Fonts/Variable_Fonts_Guide`,
      title: labels['Variable fonts guide'],
    },
  ];

  const grid = [
    {
      path: `${webCssURL}CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout`,
      title: labels['Basics concepts of grid layout'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Relationship_of_Grid_Layout`,
      title: labels['Relationship to other layout methods'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Line-based_Placement_with_CSS_Grid`,
      title: labels['Line-based placement'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Grid_Template_Areas`,
      title: labels['Grid template areas'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Layout_using_Named_Grid_Lines`,
      title: labels['Layout using named grid lines'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout`,
      title: labels['Auto-placement in grid layout'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout`,
      title: labels['Box alignment in grid layout'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/CSS_Grid_Logical_Values_and_Writing_Modes`,
      title: labels['Grids, logical values and writing modes'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/CSS_Grid_Layout_and_Accessibility`,
      title: labels['Grid layout and accessibility'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/CSS_Grid_and_Progressive_Enhancement`,
      title: labels['Grid Layout and progressive enhancement'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout`,
      title: labels['Realizing common layouts using grids'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Subgrid`,
      title: labels['Subgrid'],
    },
    {
      path: `${webCssURL}CSS_Grid_Layout/Masonry_Layout`,
      title: labels['Masonry layout'],
    },
  ];

  const images = [
    {
      path: `${webCssURL}CSS_Images/Using_CSS_gradients`,
      title: labels['Using CSS gradients'],
    },
  ];

  const listsAndCounters = [
    {
      path: `${webCssURL}CSS_Lists_and_Counters/Using_CSS_counters`,
      title: labels['Using CSS counters'],
    },
    {
      path: `${webCssURL}CSS_Lists_and_Counters/Consistent_list_indentation`,
      title: labels['Consistent list indentation'],
    },
  ];

  const logicalProperties = [
    {
      path: `${webCssURL}CSS_Logical_Properties/Basic_concepts`,
      title: labels['Basic concepts'],
    },
    {
      path: `${webCssURL}CSS_Logical_Properties/Floating_and_positioning`,
      title: labels['Floating and positioning'],
    },
    {
      path: `${webCssURL}CSS_Logical_Properties/Margins_borders_padding`,
      title: labels['Margins, borders and padding'],
    },
    {
      path: `${webCssURL}CSS_Logical_Properties/Sizing`,
      title: labels['Sizing'],
    },
  ];

  const mediaQueries = [
    {
      path: `${webCssURL}Media_Queries/Using_media_queries`,
      title: labels['Using media queries'],
    },
    {
      path: `${webCssURL}Media_Queries/Using_Media_Queries_for_Accessibility`,
      title: labels['Using media queries for accessibility'],
    },
    {
      path: `${webCssURL}Media_Queries/Testing_media_queries`,
      title: labels['Testing media queries programmatically'],
    },
  ];

  const positioning = [
    {
      path: `${webCssURL}CSS_Positioning/Understanding_z_index`,
      title: labels['Understanding CSS z-index'],
    },
  ];

  const scrollSnap = [
    {
      path: `${webCssURL}CSS_Scroll_Snap/Basic_concepts`,
      title: labels['Basic concepts of scroll snap'],
    },
    {
      path: `${webCssURL}CSS_Scroll_Snap/Browser_compat`,
      title: labels['Browser compatibility and scroll snap'],
    },
  ];

  const shapes = [
    {
      path: `${webCssURL}CSS_Shapes/Overview_of_CSS_Shapes`,
      title: labels['Overview of shapes'],
    },
    {
      path: `${webCssURL}CSS_Shapes/From_box_values`,
      title: labels['Shapes from box values'],
    },
    {
      path: `${webCssURL}CSS_Shapes/Basic_Shapes`,
      title: labels['Basic shapes'],
    },
    {
      path: `${webCssURL}CSS_Shapes/Shapes_From_Images`,
      title: labels['Shapes from images'],
    },
  ];

  const text = [
    {
      path: `${webCssURL}CSS_Text/Wrapping_Text`,
      title: labels['Wrapping and breaking text'],
    },
  ];

  const transforms = [
    {
      path: `${webCssURL}CSS_Transforms/Using_CSS_transforms`,
      title: labels['Using transforms'],
    },
  ];

  const transitions = [
    {
      path: `${webCssURL}CSS_Transitions/Using_CSS_transitions`,
      title: labels['Using transitions'],
    },
  ];

  const pageToNavItem = ({ path, title }) => ({
    title,
    path,
    isCurrent: path === currentPath,
  });

  return [
    {
      title: labels['Animations'],
      items: animationsSections.map(pageToNavItem),
      expanded: !!animationsSections.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Backgrounds and Borders'],
      items: backgroundsAndBorders.map(pageToNavItem),
      expanded: !!backgroundsAndBorders.find(
        ({ path }) => path === currentPath
      ),
    },
    {
      title: labels['Box alignment'],
      items: boxAlignment.map(pageToNavItem),
      expanded: !!boxAlignment.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Box model'],
      items: boxModel.map(pageToNavItem),
      expanded: !!boxModel.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Columns'],
      items: columns.map(pageToNavItem),
      expanded: !!columns.find(({ path }) => path === currentPath),
    },
    {
      title: labels['CSSOM view'],
      items: cssomView.map(pageToNavItem),
      expanded: !!cssomView.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Flexbox'],
      items: flexbox.map(pageToNavItem),
      expanded: !!flexbox.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Flow layout'],
      items: flowLayout.map(pageToNavItem),
      expanded: !!flowLayout.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Fonts'],
      items: fonts.map(pageToNavItem),
      expanded: !!fonts.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Grid'],
      items: grid.map(pageToNavItem),
      expanded: !!grid.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Images'],
      items: images.map(pageToNavItem),
      expanded: !!images.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Lists and counters'],
      items: listsAndCounters.map(pageToNavItem),
      expanded: !!listsAndCounters.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Logical properties'],
      items: logicalProperties.map(pageToNavItem),
      expanded: !!logicalProperties.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Media queries'],
      items: mediaQueries.map(pageToNavItem),
      expanded: !!mediaQueries.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Positioning'],
      items: positioning.map(pageToNavItem),
      expanded: !!positioning.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Scroll snap'],
      items: scrollSnap.map(pageToNavItem),
      expanded: !!scrollSnap.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Shapes'],
      items: shapes.map(pageToNavItem),
      expanded: !!shapes.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Text'],
      items: text.map(pageToNavItem),
      expanded: !!text.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Transforms'],
      items: transforms.map(pageToNavItem),
      expanded: !!transforms.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Transitions'],
      items: transitions.map(pageToNavItem),
      expanded: !!transitions.find(({ path }) => path === currentPath),
    },
  ];
};
