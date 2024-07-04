<script setup lang="ts">
import type {Movie} from "@/ts/interface";

const props = defineProps<{ card: Movie }>();

const { name, additional, description, genre, id, image } =
  props.card;

interface GenreMap {
  [key: number]: [string, string];
}
const getGenre = () => {
  const genres: GenreMap = {
    0: ['genre--orange', 'ACTION'],
    1: ['genre--green', 'ADVENTURES'],
    2: ['genre--gold', 'COMEDY'],
    3: ['genre--blue', 'DRAMA'],
    4: ['genre--red', 'HORROR'],
    5: ['genre--brown', 'WESTERNS'],
  };

  return genres[genre] || ['', 'UNKNOWN'];
};
</script>

<template>
  <div class="card">
    <div class="card__wrapper">
      <router-link tag="div" class="card__photo" :to="{ name: 'movie-detail', params: {id: id} }">
        <img
          v-if="image"
          :src="image"
          alt=""
        />

        <div v-else class="card__photo--empty">?</div>
      </router-link>

      <div class="card__content">

        <router-link tag="div" :to="{ name: 'movie-detail', params: {id: id} }" class="card__content-header">
          <h3 class="card__content-title">
            <strong>{{name}}</strong>
          </h3>

          <div class="card__content-genre">
            <strong :class="getGenre()[0]">{{getGenre()[1]}}</strong>
          </div>
        </router-link>

        <p class="card__content-description" v-html="additional ?? '...'"></p>
      </div>
    </div>
  </div>
</template>
