<script setup lang="ts">
import Card from "@/components/Cards/Card.vue";
import { useMoviesStore } from "@/stores/movies";
import {computed, onMounted, ref} from "vue";
import InputText from "@/components/ElementForm/InputText.vue";
import Button from "@/components/Button.vue";
import Loader from "@/components/Loader.vue";
import EmptyBLock from "@/components/EmptyBLock.vue";
const moviesStore = useMoviesStore();

const name = ref<string>('')

const getMovies = moviesStore.getMovies;
const changeGenre = moviesStore.changeGenre;

onMounted(() => {
  getMovies(genre.value, name.value)
})

const movies = computed(() => moviesStore.Movies);
const genre = computed(() => moviesStore.Genre);
const loader = computed(() => moviesStore.loader)

const changeFilter = (genre: number | null) => {
  changeGenre(genre)
  getMovies(genre, name.value)
}

const filter_buttons = [
  {
    id: 0,
    name: 'ACTION',
    class: 'button--orange'
  },

  {
    id: 1,
    name: 'ADVENTURES',
    class: 'button--green'
  },

  {
    id: 2,
    name: 'COMEDY',
    class: 'button--gold'
  },

  {
    id: 3,
    name: 'DRAMA',
    class: 'button--blue'
  },

  {
    id: 4,
    name: 'HORROR',
    class: 'button--red'
  },

  {
    id: 5,
    name: 'WESTERNS',
    class: 'button--brown'
  }
]
</script>

<template>
  <div class="header-block">
    <div class="header-block__wrapper">
      <div class="header-block__search">
        <h3>
          <strong>Movie Cards</strong>
        </h3>

        <div class="header-block__form">
          <InputText
              class="input--search"
              id="search"
              v-model:value="name"
              @keyup.enter="getMovies(genre, name)"
              placeholder="Search"
          />

          <Button @click.native="getMovies(genre, name)">Search</Button>
        </div>
      </div>

      <div class="header-block__filters">
        <h4>
          <strong>Movie genres:</strong>
        </h4>

        <ul class="header-block__buttons">
          <li class="header-block__button">
            <Button :class="{'button--filter': genre !== null}" @click.native="changeFilter(null)" :button_xs="true">All</Button>
          </li>

          <li class="header-block__button" v-for="item in filter_buttons" :key="item.id">
            <Button @click.native="changeFilter(item.id)" :class="{'button--filter': genre !== item.id, [item.class]: true}" :button_xs="true">{{item.name}}</Button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="cards">
      <template v-if="movies.length > 0">
        <template v-if="!loader">
          <div class="cards__wrapper">
            <h3 class="cards__title">
              Movies
            </h3>
          </div>

          <ul class="cards__list">
            <li
                class="cards__item"
                v-for="(card, index) in movies"
                :key="index"
            >
              <Card :card="card"/>
            </li>
          </ul>
        </template>

        <div v-else class="cards__loader">
          <Loader />
        </div>
      </template>
    </div>

    <EmptyBLock v-if="movies.length === 0 && !loader"
    >Nothing was found for your request.</EmptyBLock
    >
  </div>
</template>
