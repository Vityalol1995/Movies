<script lang="ts" setup>
import { useMoviesStore } from "@/stores/movies";
import type {Tickets} from "@/ts/interface";

const moviesStore = useMoviesStore();
const tickets:Tickets[] = moviesStore.tickets
</script>

<template>
  <div class="tickets">
    <ul class="tickets__list">
      <li class="tickets__item" v-for="item in tickets" :key="item.id">
        <div class="tickets__inf">
          <ul>
            <li>Data: {{item.showdate}}</li>
            <li>Time: {{item.daytime}}</li>
            <li>Row: {{item.row}}</li>
            <li>Seat: {{item.seat}}</li>
            <li>Key: {{item.ticketkey}}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
