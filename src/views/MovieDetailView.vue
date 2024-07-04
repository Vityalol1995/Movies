<script setup lang="ts">
import { useMoviesStore } from "@/stores/movies";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import Button from "@/components/Button.vue";
import type {Movie, Shows, Ticket} from "@/ts/interface";

const route = useRoute();
const moviesStore = useMoviesStore();
const movie = ref<Movie | null>(null);
const shows = ref<Shows[]>([]);
const selectedDate = ref<string>('');
const selectedTime = ref<string>('');
const selectedSeats = ref<Ticket[]>([]);

const fetchMovie = async () => {
  const data = await moviesStore.getMovieById(+route.params.id);
  if (data) {
    movie.value = data;
    fetchMovieShows();
  }
};

const fetchMovieShows = async () => {
  const data = await moviesStore.getMovieShowsById(+route.params.id);
  if (movie.value) {
    shows.value = data[movie.value.id] ?? [];
  }
};

onBeforeMount(() => {
  fetchMovie();
});

const rows = {
  0: 10,
  1: 11,
  2: 13,
  3: 14,
  4: 15,
  5: 16,
  6: 18
}

const dates = computed(() => {
  return shows.value.map(show => show.showdate);
});

const showtimes = computed(() => {
  const timesByDate: { [key: string]: string[] } = {};
  shows.value.forEach(show => {
    timesByDate[show.showdate] = show.daytime.split(';');
  });
  return timesByDate;
});

const handleSeatClick = (row: number, seat: number) => {
  const existingSeatIndex = selectedSeats.value.findIndex(seatData =>
      seatData.date === selectedDate.value &&
      seatData.time === selectedTime.value &&
      seatData.row === row &&
      seatData.seat === seat
  );

  if (existingSeatIndex !== -1) {
    selectedSeats.value.splice(existingSeatIndex, 1);
  } else {
    selectedSeats.value.push({
      id: movie.value?.id ?? 0,
      date: selectedDate.value,
      time: selectedTime.value,
      row: row,
      seat: seat
    });
  }
};

const isSeatSelected = (row: number, seat: number) => {
  return selectedSeats.value.some(seatData =>
      seatData.date === selectedDate.value &&
      seatData.time === selectedTime.value &&
      seatData.row === row &&
      seatData.seat === seat
  );
};

const addTickets = () => {
  moviesStore.postBookPlace(selectedSeats.value)
}
</script>

<template>
<div v-if="movie">
  <div class="container">
    <div class="movie-detail">
      <div class="movie-detail__wrapper">
        <div class="movie-detail__photo">
          <img :src="movie.image" alt="">
        </div>

        <div class="movie-detail__inf">

          <h2>{{movie.name}}</h2>

          <p v-html="movie.description"></p>
        </div>
      </div>

      <div class="movie-detail__session">
        <div class="select">
          <label for="data-select" class="select__label">Select Date:</label>
          <select id="data-select" class="select__element" v-model="selectedDate">
            <option :value="null" selected>Select Date</option>
            <option v-for="date in dates" :key="date">{{ date }}</option>
          </select>
        </div>

        <div class="select">
          <label for="time-select" class="select__label">Select Time:</label>
          <select id="time-select" class="select__element" v-model="selectedTime">
            <option :value="null" selected>Select Time</option>
            <option v-for="time in showtimes[selectedDate]" :key="time">{{ time }}</option>
          </select>
        </div>
      </div>

      <template v-if="selectedDate && selectedTime">
        <div class="movie-detail__shows">
          <ul v-for="(item, index) in rows" :key="index">
            <li v-for="el in item" :key="el">
              <Button :class="{ 'button--selected': isSeatSelected(index, el - 1) }"
                      @click.native="handleSeatClick(index, el - 1)" class="button--slot" :button_xs="true">{{el}}</Button>
            </li>
          </ul>
        </div>

        <div class="movie-detail__action">
          <Button @click.native="addTickets" class="button--orange" :disabled="selectedSeats.length === 0">Continue</Button>
        </div>
      </template>
    </div>
  </div>
</div>
</template>
