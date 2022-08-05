<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-system-indigo">
      <q-toolbar>
        <q-btn
          color="cyan-13"
          dense
          flat
          icon="menu"
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="q-px-sm">
          <span class="text-system-primary text-bold text-subtitle1">
            Vee validate V4
          </span>
        </q-toolbar-title>
        <div>
          <q-btn-toggle
            v-model="language"
            :options="[
              { label: 'فا', value: 'fa-IR' },
              { label: 'En', value: 'en-US' },
            ]"
            color="red"
            padding="3px 10px"
            dense
            no-caps
            rounded
            text-color="white"
            toggle-color="cyan-13"
            flat
            glossy
            @update:model-value="setLanguage"
          />
          <q-toggle
            v-model="appTheme"
            :color="appTheme ? 'amber' : 'indigo-11'"
            checked-icon="mdi-brightness-7"
            class="text-blue q-mr-xs"
            keep-color
            unchecked-icon="mdi-brightness-2"
            @update:model-value="toggleTheme"
          />
          <q-btn
            class="q-px-xs text-system-primary custom-round-borders"
            dense
            flat
            :label="t('logout')"
            @click="logout"
          >
            <q-icon class="cursor-pointer" name="mdi-logout" />
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="1200"
      :width="320"
      class="bg-system-indigo overflow-hidden"
      show-if-above
    >
      <q-scroll-area style="height: calc(100% - 200px); margin-top: 200px">
        <q-list padding>
          <q-list>
            <q-item
              v-for="(child, childIndex) in linkItems"
              :key="child.to + childIndex"
              v-ripple
              :to="child.to"
              active-class="text-white bg-indigo-11 rounded-borders"
              class="
                text-white
                q-mx-md q-my-sm q-pa-none
                drawer-item-borders drawer-item
              "
              clickable
              exact
            >
              <q-item-section avatar> </q-item-section>
              <q-item-section class="text-bold">
                {{ child.title }}</q-item-section
              >
            </q-item>
          </q-list>
        </q-list>
      </q-scroll-area>
      <lottie-player
        autoplay
        class="absolute-top"
        loop
        mode="normal"
        src="/animations/drawer-animation.json"
        style="height: 200px; width: 320px"
      ></lottie-player>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <q-page-scroller
        :offset="[18, 0]"
        :scroll-offset="150"
        position="bottom-left"
      >
        <q-btn color="system-primary" glossy icon="keyboard_arrow_up" round />
      </q-page-scroller>
    </q-page-container>
    <q-footer class="bg-system-indigo">
      <q-item
        class="text-center text-system-primary text-bold text-caption"
        clickable
        dense
        href="https://vee-validate.logaretm.com/v4/"
        tag="a"
        target="_blank"
      >
        <q-item-section class="footer-container">
          <span class="q-px-sm bg-footer relative-position" style="z-index: 1">
            Vee validate 4 change locale sample
          </span>
        </q-item-section>
      </q-item>
    </q-footer>
  </q-layout>
</template>
<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
// import TopSection from "components/TopSection";
// the import ia essential in order to use vue-lottie component
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { setLocale } from "@vee-validate/i18n";

const langList = import.meta.glob(
  "../../node_modules/quasar/lang/(en-US|fa-IR).mjs"
);

const items = [
  {
    title: "1",
    icon: "mdi-cog",
    to: "/ceo1",
  },
  {
    title: "2",
    icon: "mdi-cog",
    to: "/ceo2",
  },
];

export default {
  components: {},
  setup() {
    onMounted(async () => {
      // userProfile.value = await auth.getUser();
    });
    const $q = useQuasar();
    const { t, locale } = useI18n({ useScope: "global" });
    const leftDrawerOpen = ref(false);

    const linkItems = ref(items);
    let appTheme = ref(true);
    let language = ref("en-US");

    let dark = JSON.parse(localStorage.getItem("dark"));
    if (dark !== undefined && dark !== null) {
      appTheme.value = !dark;
      $q.dark.set(dark);
    } else {
      appTheme.value = true;
      $q.dark.set(false);
    }

    const logout = function () {};

    const toggleTheme = (value) => {
      $q.dark.set(!value);
      localStorage.setItem("dark", JSON.stringify(!value));
    };
    const setLanguage = (value) => {
      locale.value = value;
      //also handling quasar language pack
      try {
        langList[`../../node_modules/quasar/lang/${value}.mjs`]().then(
          (lang) => {
            $q.lang.set(lang.default);
          }
        );
      } catch (err) {
        // Requested Quasar Language Pack does not exist,
        // let's not break the app, so catching error
      } finally {
        localStorage.setItem("lang", JSON.stringify(value));
        // updating vee-validate locale
        const i18nLang = value === "en-US" ? "en" : "fa";
        setLocale(i18nLang);
      }
    };
    let lang = JSON.parse(localStorage.getItem("lang"));
    if (lang) {
      setLanguage(lang);
      // initialize v-model
      language.value = lang;
    } else {
      setLanguage(language);
    }
    return {
      t,
      locale,
      leftDrawerOpen,
      linkItems,
      appTheme,
      language,
      logout,
      toggleTheme,
      setLanguage,
    };
  },
};
</script>
