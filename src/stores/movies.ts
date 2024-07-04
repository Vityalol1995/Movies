import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {Movie, Ticket} from "@/ts/interface";

type genre = number | null
export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const genre = ref<genre>(null)
  const loader = ref<boolean>(false);

  const getMovies = async (genres: genre = null, name: string = '') => {
    loader.value = true;
    try {

      const response = await fetch(`https://cinema-api-test.y-media.io/v1/movies?genres=${genres}&name=${name}`);
      const res = await response.json();
      movies.value = res.data;

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      console.log(e);
    } finally {
      loader.value = false;
    }
  }

  const getMovieById = async (id: number) => {
    try {
      const response = await fetch(`https://cinema-api-test.y-media.io/v1/movies?movie_id=${id}`);
      const res = await response.json();
      return res.data[0]
    } catch (e) {
      console.log(e);
      loader.value = false;
    }
  }

  const getMovieShowsById = async (id: number) => {
    try {
      const response = await fetch(`https://cinema-api-test.y-media.io/v1/movieShows?movie_id=${id}`);
      const res = await response.json();
      console.log(res.data)
      return res.data
    } catch (e) {
      console.log(e);
    }
  }

    const postBookPlace = async (tickets: Ticket[]) => {
      const url = 'https://cinema-api-test.y-media.io/v1/bookPlace';

      const requests = tickets.map(ticket => ({
        movie_id: ticket.id,
        row: ticket.row,
        seat: ticket.seat,
        showdate: ticket.date,
        daytime: ticket.time
      }));

      try {
        const responses = await Promise.all(
            requests.map(request =>
                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(request)
                })
            )
        );

        const results = await Promise.all(responses.map(response => response.json()));

        const storedTickets = localStorage.getItem('tickets');
        let currentTickets = storedTickets ? JSON.parse(storedTickets) : [];

        results.forEach(ticket => {
          currentTickets.push(ticket.data);
        });

        localStorage.setItem('tickets', JSON.stringify(currentTickets));

        window.location.href = '/'

      } catch (error) {
        console.error('Error booking places:', error);
      }
    }

  const changeGenre = (new_genre: genre = null) => {
    genre.value = new_genre
  }

  const Movies = computed(() => {
    return movies.value
  })

  const Genre = computed(() => {
    return genre.value
  })

  const tickets = computed(() => {
    const storedTickets = localStorage.getItem('tickets');
    return storedTickets ? JSON.parse(storedTickets) : [];
  })

  return { movies, getMovies, getMovieById, getMovieShowsById, changeGenre, Movies, Genre, loader, postBookPlace, tickets }
})
