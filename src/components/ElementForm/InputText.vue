<script setup lang="ts">
interface Props {
  value: string,
  label?: string | null,
  placeholder?: string,
  id: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:value', value: string):void
}>()
const emitUpdate = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:value', value);
};
</script>

<template>
  <div class="field">
    <label :for="props.id" class="field__label" v-if="props.label && props.label.length > 0">
      {{props.label}}
    </label>
    <input
        :id="props.id"
        :placeholder="props.placeholder"
        :value="props.value"
        type="text"
        @input="emitUpdate($event)"
    >
  </div>

</template>
