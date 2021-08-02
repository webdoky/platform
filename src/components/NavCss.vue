<template>
  <div>
    <h2 class="pt-0 mt-0 mb-4 text-base tracking-tight uppercase border-none">Вивчення CSS</h2>
    <div
      v-for="(section, index) in learningSections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < learningSections.length -1 }"
    >
      <nav-sub-menu :expanded="section.expanded">
        <template v-slot:header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="getClassesForAnchor(page)"
            @mousedown="$emit('navigate')"
          >
            <nav-item :page="page" :is-current="currentPage.path === page.path" />
          </li>
        </ul>
      </nav-sub-menu>
    </div>

    <h2 class="pt-0 mt-0 mb-4 text-base tracking-tight uppercase border-none">Довідник</h2>
    <div
      v-for="(section, index) in refSections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < refSections.length -1 }"
    >
      <nav-sub-menu :expanded="section.expanded">
        <template v-slot:header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="getClassesForAnchor(page)"
            @mousedown="$emit('navigate')"
          >
            <nav-item :page="page" :is-current="currentPage.path === page.path" />
          </li>
        </ul>
      </nav-sub-menu>
    </div>

    <h2 class="pt-0 mt-0 mb-4 text-base tracking-tight uppercase border-none">Настанови</h2>
    <div
      v-for="(section, index) in guidesSections"
      :key="section.title"
      class="pb-4 mb-4 border-ui-border"
      :class="{ 'border-b': index < guidesSections.length -1 }"
    >
      <nav-sub-menu :expanded="section.expanded">
        <template v-slot:header>{{ section.title }}</template>

        <ul class="max-w-full pl-2 mb-0">
          <li
            v-for="page in section.items"
            :id="page.path"
            :key="page.path"
            :class="getClassesForAnchor(page)"
            @mousedown="$emit('navigate')"
          >
            <nav-item :page="page" :is-current="currentPage.path === page.path" />
          </li>
        </ul>
      </nav-sub-menu>
    </div>
  </div>
</template>

<script>
import NavSubMenu from '@/components/NavSubMenu';
import NavItem from '@/components/NavItem';
import { CSSRefLabels } from '../../kuma';

const learnURL = `/en-US/docs/Learn/`;
const webCssURL = `/en-US/docs/Web/CSS/`;

export default {
  components: {
    NavSubMenu,
    NavItem
  },
  props: ['allPages', 'currentPage'],  
  computed: {
    pages() {
      return this.allPages.map(({node}) => node);
    },
    learningSections() {

        const firstStepsItems = [
          { path: `${learnURL}CSS/First_steps`, title: CSSRefLabels['CSS_first_steps_overview']},
          { path: `${learnURL}CSS/First_steps/What_is_CSS`, title: CSSRefLabels['What_is_CSS']},
          { path: `${learnURL}CSS/First_steps/Getting_started`, title: CSSRefLabels['Getting_started_with_CSS']},
          { path: `${learnURL}CSS/First_steps/How_CSS_is_structured`, title: CSSRefLabels['How_CSS_is_structured']},
          { path: `${learnURL}CSS/First_steps/How_CSS_works`, title: CSSRefLabels['How_CSS_works']},
          { path: `${learnURL}CSS/First_steps/Using_your_new_knowledge`, title: CSSRefLabels['Using_your_new_knowledge']},
        ]

        const buildingBlocks = [
          { path: `${learnURL}CSS/Building_blocks`, title: CSSRefLabels['CSS_building_blocks_overview']},
          { path: `${learnURL}CSS/Building_blocks/Cascade_and_inheritance`, title: CSSRefLabels['Cascade_and_inheritance']},
          { path: `${learnURL}CSS/Building_blocks/Selectors`, title: CSSRefLabels['CSS_selectors']},
          { path: `${learnURL}CSS/Building_blocks/The_box_model`, title: CSSRefLabels['The_box_model']},
          { path: `${learnURL}CSS/Building_blocks/Backgrounds_and_borders`, title: CSSRefLabels['Backgrounds_and_borders']},
          { path: `${learnURL}CSS/Building_blocks/Handling_different_text_directions`, title: CSSRefLabels['Handling_different_text_directions']},
          { path: `${learnURL}CSS/Building_blocks/Overflowing_content`, title: CSSRefLabels['Overflowing_content']},
          { path: `${learnURL}CSS/Building_blocks/Values_and_units`, title: CSSRefLabels['Values_and_units']},
          { path: `${learnURL}CSS/Building_blocks/Sizing_items_in_CSS`, title: CSSRefLabels['Sizing_items_in_CSS']},
          { path: `${learnURL}CSS/Building_blocks/Images_media_form_elements`, title: CSSRefLabels['Images_media_and_form_elements']},
          { path: `${learnURL}CSS/Building_blocks/Styling_tables`, title: CSSRefLabels['Styling_tables']},
          { path: `${learnURL}CSS/Building_blocks/Debugging_CSS`, title: CSSRefLabels['Debugging_CSS']},
          { path: `${learnURL}CSS/Building_blocks/Organizing`, title: CSSRefLabels['Organizing_your_CSS']},
        ]

        const stylingText = [
          {path: `${learnURL}CSS/Styling_text`, title: CSSRefLabels['Styling_text_overview'] },
          {path: `${learnURL}CSS/Styling_text/Fundamentals`, title: CSSRefLabels['Fundamental_text_and_font_styling'] },
          {path: `${learnURL}CSS/Styling_text/Styling_lists`, title: CSSRefLabels['Styling_lists'] },
          {path: `${learnURL}CSS/Styling_text/Styling_links`, title: CSSRefLabels['Styling_links'] },
          {path: `${learnURL}CSS/Styling_text/Web_fonts`, title: CSSRefLabels['Web_fonts'] },
          {path: `${learnURL}CSS/Styling_text/Typesetting_a_homepage`, title: CSSRefLabels['Assessment_typesetting_a_community_school_homepage'] },
        ]

        const cssLayout = [
          { path: `${learnURL}CSS/CSS_layout`, title: CSSRefLabels['CSS_layout_overview']},
          { path: `${learnURL}CSS/CSS_layout/Introduction`, title: CSSRefLabels['Layout_introduction']},
          { path: `${learnURL}CSS/CSS_layout/Normal_Flow`, title: CSSRefLabels['Normal_Flow']},
          { path: `${learnURL}CSS/CSS_layout/Flexbox`, title: CSSRefLabels['Flexbox']},
          { path: `${learnURL}CSS/CSS_layout/Grids`, title: CSSRefLabels['Grids']},
          { path: `${learnURL}CSS/CSS_layout/Floats`, title: CSSRefLabels['Floats']},
          { path: `${learnURL}CSS/CSS_layout/Positioning`, title: CSSRefLabels['Positioning']},
          { path: `${learnURL}CSS/CSS_layout/Multiple-column_Layout`, title: CSSRefLabels['Multiple-column_Layout']},
          { path: `${learnURL}CSS/CSS_layout/Responsive_Design`, title: CSSRefLabels['Responsive_design']},
          { path: `${learnURL}CSS/CSS_layout/Media_queries`, title: CSSRefLabels['Media_queries']},
          { path: `${learnURL}CSS/CSS_layout/Legacy_Layout_Methods`, title: CSSRefLabels['Legacy_Layout_Methods']},
          { path: `${learnURL}CSS/CSS_layout/Supporting_Older_Browsers`, title: CSSRefLabels['Supporting_Older_Browsers']},
          { path: `${learnURL}CSS/CSS_layout/Fundamental_Layout_Comprehension`, title: CSSRefLabels['Fundamental_Layout_Comprehension']},
        ]

        return [
          {
            title: CSSRefLabels['CSS_first_steps'],
            items: firstStepsItems,
            expanded: firstStepsItems.find(({path}) => path === this.currentPage.path)
          },{
            title: CSSRefLabels['CSS_building_blocks'],
            items: buildingBlocks,
            expanded: buildingBlocks.find(({path}) => path === this.currentPage.path)
          },{
            title: CSSRefLabels['Styling_text'],
            items: stylingText,
            expanded: stylingText.find(({path}) => path === this.currentPage.path)
          },{
            title: CSSRefLabels['CSS_layout'],
            items: cssLayout,
            expanded: cssLayout.find(({path}) => path === this.currentPage.path)
          }
        ]
    },
    refSections() {
        const cssPages = this.pages.filter(({path}) => path.indexOf('/en-US/docs/Web/CSS') >= 0);
        const standardPages = cssPages.filter(({tags}) => !tags.includes("Non-standard"));

        const groups = standardPages.filter(({tags}) => tags.includes("Overview"));
        const properties = standardPages.filter(({tags}) => tags.includes("CSS Property"));
        const selectors = standardPages.filter(({tags}) => (tags.includes("Selector") && !tags.includes("Pseudo-element") && !tags.includes("Pseudo-class")));
        const pseudoClasses = standardPages.filter(({tags}) => tags.includes("Pseudo-class"));
        const pseudoElements = standardPages.filter(({tags}) => tags.includes("Pseudo-element"));
        const atRules = standardPages.filter(({tags}) => tags.includes("At-rule"));
        const types = standardPages.filter(({tags}) => tags.includes("CSS Data Type"));

        return [
          {
            title: 'Модулі',
            items: groups,
            expanded: groups.find(({path}) => path === this.currentPage.path)
          },{
            title: 'Властивості',
            items: properties,
            expanded: properties.find(({path}) => path === this.currentPage.path)
          },{
            title: 'Селектори',
            items: selectors,
            expanded: selectors.find(({path}) => path === this.currentPage.path),
          },{
            title: 'Псевдокласи',
            items: pseudoClasses,
            expanded: pseudoClasses.find(({path}) => path === this.currentPage.path),
          },{
            title: 'Псевдоелементи',
            items: pseudoElements,
            expanded: pseudoElements.find(({path}) => path === this.currentPage.path),
          },{
            title: 'Анотації',
            items: atRules,
            expanded: atRules.find(({path}) => path === this.currentPage.path),
          },{
            title: 'Типи',
            items: types,
            expanded: types.find(({path}) => path === this.currentPage.path),
          },
        ]
    },
    guidesSections() {
      const animationsSections = [
        { path: `${webCssURL}CSS_Animations/Using_CSS_animations`, title: CSSRefLabels['Using CSS animations']},
      ];

      const backgroundsAndBorders = [
        { path: `${webCssURL}CSS_Backgrounds_and_Borders/Using_multiple_backgrounds`, title: CSSRefLabels["Using multiple backgrounds"] },
        { path: `${webCssURL}CSS_Backgrounds_and_Borders/Resizing_background_images`, title: CSSRefLabels["Resizing background images"] },
      ];

      const boxAlignment = [
        { path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_In_Block_Abspos_Tables`, title: CSSRefLabels["Box alignment in block layout"] },
        { path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_in_Flexbox`, title: CSSRefLabels["Box alignment in flexbox"] },
        { path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_In_Grid_Layout`, title: CSSRefLabels["Box alignment in grid layout"] },
        { path: `${webCssURL}CSS_Box_Alignment/Box_Alignment_in_Multi-column_Layout`, title: CSSRefLabels["Box alignment in multi-column layout"] },
      ];

      const boxModel = [
        { path: `${webCssURL}CSS_Box_Model/Introduction_to_the_CSS_box_model`, title: CSSRefLabels["Introduction to the CSS basic box model"] },
        { path: `${webCssURL}CSS_Box_Model/Mastering_margin_collapsing`, title: CSSRefLabels["Mastering margin collapsing"] },
      ]

      const columns = [
        { path: `${webCssURL}CSS_Columns/Basic_Concepts_of_Multicol`, title: CSSRefLabels["Basic concepts of Multicol"] },
        { path: `${webCssURL}CSS_Columns/Styling_Columns`, title: CSSRefLabels["Styling columns"] },
        { path: `${webCssURL}CSS_Columns/Spanning_Columns`, title: CSSRefLabels["Spanning and balancing"] },
        { path: `${webCssURL}CSS_Columns/Handling_Overflow_in_Multicol`, title: CSSRefLabels["Handling overflow in Multicol"] },
        { path: `${webCssURL}CSS_Columns/Handling_content_breaks_in_multicol`, title: CSSRefLabels["Content breaks in Multicol"] },
      ]

      const cssomView = [
        { path: `${webCssURL}CSSOM_View/Coordinate_systems`, title: CSSRefLabels["Coordinate systems"] },
      ]

      const flexbox = [
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox`, title: CSSRefLabels["Basic concepts of Flexbox"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Relationship_of_Flexbox_to_Other_Layout_Methods`, title: CSSRefLabels["Comparison with other layout methods"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container`, title: CSSRefLabels["Aligning items in a flex container"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Ordering_Flex_Items`, title: CSSRefLabels["Ordering flex items"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax`, title: CSSRefLabels["Controlling flex item ratios"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items`, title: CSSRefLabels["Mastering wrapping of flex items"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox`, title: CSSRefLabels["Typical use cases of Flexbox"] },
        { path: `${webCssURL}CSS_Flexible_Box_Layout/Backwards_Compatibility_of_Flexbox`, title: CSSRefLabels["Backwards compatibility of Flexbox"] },
      ]

      const flowLayout = [
        { path: `${webCssURL}CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow`, title: CSSRefLabels["Block and Inline layout in normal flow"] },
        { path: `${webCssURL}CSS_Flow_Layout/In_Flow_and_Out_of_Flow`, title: CSSRefLabels["In flow and Out of flow"] },
        { path: `${webCssURL}CSS_Flow_Layout/Intro_to_formatting_contexts`, title: CSSRefLabels["Formatting contexts explained"] },
        { path: `${webCssURL}CSS_Flow_Layout/Flow_Layout_and_Writing_Modes`, title: CSSRefLabels["Flow layout and writing modes"] },
        { path: `${webCssURL}CSS_Flow_Layout/Flow_Layout_and_Overflow`, title: CSSRefLabels["Flow layout and overflow"] },
      ];

      const fonts = [
        { path: `${webCssURL}CSS_Fonts/OpenType_fonts_guide`, title: CSSRefLabels["OpenType font features guide"] },
        { path: `${webCssURL}CSS_Fonts/Variable_Fonts_Guide`, title: CSSRefLabels["Variable fonts guide"] },
      ];

      const grid = [
        { path: `${webCssURL}CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout`, title: CSSRefLabels["Basics concepts of grid layout"] },
        { path: `${webCssURL}CSS_Grid_Layout/Relationship_of_Grid_Layout`, title: CSSRefLabels["Relationship to other layout methods"] },
        { path: `${webCssURL}CSS_Grid_Layout/Line-based_Placement_with_CSS_Grid`, title: CSSRefLabels["Line-based placement"] },
        { path: `${webCssURL}CSS_Grid_Layout/Grid_Template_Areas`, title: CSSRefLabels["Grid template areas"] },
        { path: `${webCssURL}CSS_Grid_Layout/Layout_using_Named_Grid_Lines`, title: CSSRefLabels["Layout using named grid lines"] },
        { path: `${webCssURL}CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout`, title: CSSRefLabels["Auto-placement in grid layout"] },
        { path: `${webCssURL}CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout`, title: CSSRefLabels["Box alignment in grid layout"] },
        { path: `${webCssURL}CSS_Grid_Layout/CSS_Grid_Logical_Values_and_Writing_Modes`, title: CSSRefLabels["Grids, logical values and writing modes"] },
        { path: `${webCssURL}CSS_Grid_Layout/CSS_Grid_Layout_and_Accessibility`, title: CSSRefLabels["Grid layout and accessibility"] },
        { path: `${webCssURL}CSS_Grid_Layout/CSS_Grid_and_Progressive_Enhancement`, title: CSSRefLabels["Grid Layout and progressive enhancement"] },
        { path: `${webCssURL}CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout`, title: CSSRefLabels["Realizing common layouts using grids"] },
        { path: `${webCssURL}CSS_Grid_Layout/Subgrid`, title: CSSRefLabels["Subgrid"] },
        { path: `${webCssURL}CSS_Grid_Layout/Masonry_Layout`, title: CSSRefLabels["Masonry layout"] },
      ];

      const images = [
        { path: `${webCssURL}CSS_Images/Using_CSS_gradients`, title: CSSRefLabels["Using CSS gradients"] },
      ];

      const listsAndCounters = [
        { path: `${webCssURL}CSS_Lists_and_Counters/Using_CSS_counters`, title: CSSRefLabels["Using CSS counters"] },
        { path: `${webCssURL}CSS_Lists_and_Counters/Consistent_list_indentation`, title: CSSRefLabels["Consistent list indentation"] },
      ]

      const logicalProperties = [
        { path: `${webCssURL}CSS_Logical_Properties/Basic_concepts`, title: CSSRefLabels["Basic concepts"] },
        { path: `${webCssURL}CSS_Logical_Properties/Floating_and_positioning`, title: CSSRefLabels["Floating and positioning"] },
        { path: `${webCssURL}CSS_Logical_Properties/Margins_borders_padding`, title: CSSRefLabels["Margins, borders and padding"] },
        { path: `${webCssURL}CSS_Logical_Properties/Sizing`, title: CSSRefLabels["Sizing"] },
      ]

      const mediaQueries = [
        { path: `${webCssURL}Media_Queries/Using_media_queries`, title: CSSRefLabels["Using media queries"] },
        { path: `${webCssURL}Media_Queries/Using_Media_Queries_for_Accessibility`, title: CSSRefLabels["Using media queries for accessibility"] },
        { path: `${webCssURL}Media_Queries/Testing_media_queries`, title: CSSRefLabels["Testing media queries programmatically"] },
      ]

      const positioning = [
        { path: `${webCssURL}CSS_Positioning/Understanding_z_index`, title: CSSRefLabels["Understanding CSS z-index"] },
      ]

      const scrollSnap = [
        { path: `${webCssURL}CSS_Scroll_Snap/Basic_concepts`, title: CSSRefLabels["Basic concepts of scroll snap"] },
        { path: `${webCssURL}CSS_Scroll_Snap/Browser_compat`, title: CSSRefLabels["Browser compatibility and scroll snap"] },
      ]

      const shapes = [
        { path: `${webCssURL}CSS_Shapes/Overview_of_CSS_Shapes`, title: CSSRefLabels["Overview of shapes"] },
        { path: `${webCssURL}CSS_Shapes/From_box_values`, title: CSSRefLabels["Shapes from box values"] },
        { path: `${webCssURL}CSS_Shapes/Basic_Shapes`, title: CSSRefLabels["Basic shapes"] },
        { path: `${webCssURL}CSS_Shapes/Shapes_From_Images`, title: CSSRefLabels["Shapes from images"] },
      ]

      const text = [
        { path: `${webCssURL}CSS_Text/Wrapping_Text`, title: CSSRefLabels["Wrapping and breaking text"] },
      ]

      const transforms = [
        { path: `${webCssURL}CSS_Transforms/Using_CSS_transforms`, title: CSSRefLabels["Using transforms"] },
      ]

      const transitions = [
        { path: `${webCssURL}CSS_Transitions/Using_CSS_transitions`, title: CSSRefLabels["Using transitions"] },
      ]

      return [
        {
          title: CSSRefLabels['Animations'],
          items: animationsSections,
          expanded: animationsSections.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Backgrounds and Borders'],
          items: backgroundsAndBorders,
          expanded: backgroundsAndBorders.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Box alignment'],
          items: boxAlignment,
          expanded: boxAlignment.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Box model'],
          items: boxModel,
          expanded: boxModel.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Columns'],
          items: columns,
          expanded: columns.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['CSSOM view'],
          items: cssomView,
          expanded: cssomView.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Flexbox'],
          items: flexbox,
          expanded: flexbox.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Flow layout'],
          items: flowLayout,
          expanded: flowLayout.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Fonts'],
          items: fonts,
          expanded: fonts.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Grid'],
          items: grid,
          expanded: grid.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Images'],
          items: images,
          expanded: images.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Lists and counters'],
          items: listsAndCounters,
          expanded: listsAndCounters.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Logical properties'],
          items: logicalProperties,
          expanded: logicalProperties.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Media queries'],
          items: mediaQueries,
          expanded: mediaQueries.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Positioning'],
          items: positioning,
          expanded: positioning.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Scroll snap'],
          items: scrollSnap,
          expanded: scrollSnap.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Shapes'],
          items: shapes,
          expanded: shapes.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Text'],
          items: text,
          expanded: text.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Transforms'],
          items: transforms,
          expanded: transforms.find(({path}) => path === this.currentPage.path)
        },{
          title: CSSRefLabels['Transitions'],
          items: transitions,
          expanded: transitions.find(({path}) => path === this.currentPage.path)
        }
      ];
    }
  },
  methods: {
    getClassesForAnchor({ path }) {
      return {
        "text-ui-primary": this.currentPage.path === path,
        "transition transform hover:translate-x-1 hover:text-ui-primary": ! this.currentPage.path === path
      };
    },
  },
};
</script>
