const experimentalBadge = require('./experimental-badge');
const deprecatedBadge = require('./deprecated-badge');
const nonStandartBadge = require('./non-standart-badge');

const navigationMap = {
    'Learn_CSS': 'Learn CSS',
    'CSS_first_steps': 'CSS first steps',
    'CSS_first_steps_overview': 'CSS first steps overview',
    'What_is_CSS':  'What is CSS?',
    'Getting_started_with_CSS': 'Getting started with CSS',
    'How_CSS_is_structured': 'How CSS is structured',
    'How_CSS_works': 'How CSS works',
    'Using_your_new_knowledge': 'Using your new knowledge',
    'CSS_building_blocks': 'CSS building blocks',
    'CSS_building_blocks_overview': 'CSS building blocks overview',
    'Cascade_and_inheritance': 'Cascade and inheritance',
    'CSS_selectors': 'CSS selectors',
    'The_box_model': 'The box model',
    'Backgrounds_and_borders': 'Backgrounds and borders',
    'Handling_different_text_directions': 'Handling different text directions',
    'Overflowing_content': 'Overflowing content',
    'Values_and_units': 'Values and units',
    'Sizing_items_in_CSS': 'Sizing items in CSS',
    'Images_media_and_form_elements': 'Images, media, and form elements',
    'Styling_tables': 'Styling tables',
    'Debugging_CSS': 'Debugging CSS',
    'Organizing_your_CSS': 'Organizing your CSS',
    'Styling_text': 'Styling text',
    'Styling_text_overview': 'Styling text overview',
    'Fundamental_text_and_font_styling': 'Fundamental text and font styling',
    'Styling_lists': 'Styling lists',
    'Styling_links': 'Styling links',
    'Web_fonts': 'Web fonts',
    'Assessment_typesetting_a_community_school_homepage': 'Assessment: Typesetting a community school homepage',
    'CSS_layout': 'CSS layout',
    'CSS_layout_overview': 'CSS layout overview',
    'Layout_introduction' : 'Introduction to CSS layout',
    'Normal_Flow' : 'Normal Flow',
    'Flexbox': 'Flexbox',
    'Grids' : 'Grids',
    'Floats': 'Floats',
    'Positioning': 'Positioning',
    'Multiple-column_Layout': 'Multiple-column Layout',
    'Responsive_design': 'Responsive design',
    'Media_queries': 'Beginner\'s guide to media queries',
    'Legacy_Layout_Methods': 'Legacy Layout Methods',
    'Supporting_Older_Browsers': 'Supporting Older Browsers',
    'Fundamental_Layout_Comprehension' : 'Fundamental Layout Comprehension',
    'Color_picker_tool': 'Color picker',
    'Box-shadow_generator': 'Box shadow generator',
    'Border-image_generator' : 'Border image generator',
}

const learnURL = `/en-US/docs/Learn/`;
const cssURL = `/en-US/docs/Web/CSS/`;

const badges = {
    ExperimentalBadge: experimentalBadge,
    NonStandardBadge: nonStandartBadge,
    DeprecatedBadge: deprecatedBadge,
}

module.exports = () => '';