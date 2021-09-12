<template>
  <div class="py-2 border-b-2 border-t-1 border-ui-primary bg-ui-footer">
    <div class="container">
      <div
        class="
          flex
          lg:items-center
          items-end
          justify-between
          -mx-2
          sm:-mx-4
          flex-col
          sm:flex-row
        "
      >
        <div v-if="!originalLink || !originalPath" class="px-2 mr-auto sm:px-4">
          <p class="mb-0.5 text-sm">
            За авторством
            <a
              href="https://github.com/webdoky/"
              target="_blank"
              rel="noopener noreferrer"
            >
              спільноти WebDoky</a
            >, доступно за ліцензією
            <a
              href="https://creativecommons.org/licenses/by-sa/2.5/"
              target="_blank"
              rel="license noopener noreferrer"
            >
              CC-BY-SA 2.5</a
            >
            (<g-link to="/docs/licensing/" class="">докладніше тут</g-link>).
          </p>
        </div>

        <div v-if="originalLink && originalPath" class="px-2 mr-auto sm:px-4">
          <p class="lg:mb-1 mb-2 text-sm">
            За авторством спільноти Mozilla (<span
              class="underline"
              style="text-decoration-style: dotted"
              title="jswisher, SphinxKnight, rana.dadu.77, mfuji09, cogpark, darby, AlemFarid, Grae-Drake, chrisdavidmills, Mirinth, envisioncodes, 9999472, wbamberg, Sheppy, asmforce, jwhitlock, Jenna59, CrazyChick63, rbg3434, fitojb, Slawek37, leandroruel, LimeClover, serv-inc, dvincent, adminisrator, groovecoder, teoli, lewiscartman, microsoft, Sanantananda, wakka27, fscholz, moh.sugiarta, Jeremie, onei, eddyng23, cherrylover85, altigere, davidsuisse1, cdac, BenB, ethertank, Gerv"
              >авторів первинної Вікі</span
            >, і
            <a
              :href="`https://github.com/mdn/content/commits/main/files/en-us${originalPath}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              пізніших учасників</a
            >).
          </p>
          <p class="mb-0.5 text-sm">
            Перекладено і адаптовано
            <a
              href="https://github.com/webdoky/"
              target="_blank"
              rel="noopener noreferrer"
            >
              спільнотою WebDoky</a
            >, доступно за ліцензією
            <a
              href="https://creativecommons.org/licenses/by-sa/2.5/"
              target="_blank"
              rel="license noopener noreferrer"
            >
              CC-BY-SA 2.5</a
            >
            (<g-link to="/docs/licensing/" class="">докладніше тут</g-link>).
          </p>
        </div>

        <div
          v-if="originalLink"
          class="flex items-center justify-end px-2 sm:px-4"
        >
          <a
            :href="originalLink"
            class="ml-3 flex items-center text-sm whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
            :title="`MDN: &quot;${originalTitle}&quot;`"
            name="originalLink"
          >
            <span>Оригінал статті</span>
            <GlobeIcon size="1.5x" class="m-1" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GlobeIcon } from 'vue-feather-icons';

export default {
  components: {
    GlobeIcon,
  },
  props: ['originalLink', 'originalTitle', 'originalPath'],
};
</script>
