<script setup lang="ts">
import { useRoute } from "vue-router";
import type { SidebarItem } from "@/ts/interface";
import { useMoviesStore } from "@/stores/movies";

const moviesStore = useMoviesStore();
const route = useRoute();

const sidebarItem: SidebarItem[] = [
  {
    route_path: "/",
    title: "Movies"
  },
  {
    route_path: "/my-tickets",
    title: "My tickets",
    count: moviesStore.tickets.length
  },
];

const isActiveLink = (routeName: string): boolean => {
  return route.path === routeName;
};
</script>

<template>
  <div class="sidebar-nav">
    <ul class="sidebar-nav__list">
      <li
        class="sidebar-nav__item"
        v-for="(item, index) in sidebarItem"
        :key="index"
      >
        <router-link
          class="sidebar-nav__link"
          :class="{ 'sidebar-nav--active': isActiveLink(item.route_path) }"
          :to="item.route_path"
        >
          <strong>{{ item.title }}</strong>
          <span v-if="item.count">{{item.count}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
