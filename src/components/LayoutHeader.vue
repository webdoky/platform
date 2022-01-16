<template>
  <div class="py-2 border-t-2 border-ui-primary">
    <div class="container">
      <div class="flex items-center justify-between -mx-2 sm:-mx-4">
        <div
          class="flex flex-col items-center px-2 mr-auto sm:px-4 sm:flex-row"
        >
          <g-link to="/" class="flex items-center text-ui-primary" title="Home">
            <Logo :width="40" class="text-ui-primary" />
            <span
              class="hidden ml-2 text-xl font-black tracking-tighter sm:block"
            >
              {{ meta.siteName }}
            </span>
          </g-link>

          <div
            v-if="settings.nav.links.length > 0"
            class="hidden ml-2 mr-5 sm:flex items-center sm:ml-2"
          >
            <g-link
              v-for="link in settings.nav.links"
              :key="link.path"
              :to="link.path"
              class="
                block
                p-1
                font-medium
                nav-link
                text-ui-typo
                hover:text-ui-primary
                sm:ml-4
                md:whitespace-nowrap
              "
            >
              {{ link.title }}
            </g-link>
          </div>
        </div>

        <div class="w-full px-2 sm:px-4 max-w-screen-xs">
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>

        <div class="flex items-center justify-end px-2 sm:px-4">
          <a
            v-if="settings.github"
            :href="settings.github"
            class="sm:ml-3"
            target="_blank"
            rel="noopener noreferrer"
            title="Ми на GitHub"
            name="Github"
          >
            <GithubIcon size="1.7" />
          </a>

          <ToggleDarkMode class="ml-2 sm:ml-8">
            <template slot="default" slot-scope="{ dark }">
              <MoonIcon v-if="dark" size="1.7" />
              <SunIcon v-else size="1.7" />
            </template>
          </ToggleDarkMode>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    settings {
      web
      github
      twitter
      nav {
        links {
          path
          title
        }
      }
    }
  }
}
</static-query>

<script>
import ToggleDarkMode from '@/components/ToggleDarkMode';
import Logo from '@/components/Logo';
import GithubIcon from '@/components/icons/Github';
import SunIcon from '@/components/icons/Sun';
import MoonIcon from '@/components/icons/Moon';

const Search = () =>
  import(/* webpackChunkName: "search" */ '@/components/Search').catch(
    (error) => console.warn(error)
  );

export default {
  components: {
    Logo,
    Search,
    ToggleDarkMode,
    SunIcon,
    MoonIcon,
    GithubIcon,
  },

  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    },
  },
};
</script>

<style lang="scss">
header {
  svg:not(.feather-search) {
    &:hover {
      @apply text-ui-primary;
    }
  }
}

.nav-link {
  &.active {
    @apply text-ui-primary font-bold border-ui-primary;
  }
}
</style>
