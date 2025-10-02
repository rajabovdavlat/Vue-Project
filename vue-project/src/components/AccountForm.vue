<template>
  <div class="account-form">
    <input
      type="text"
      class="input"
      placeholder="Метки"
      v-model="labelsString"
      @blur="updateLabels"
    />

    <select class="input" v-model="local.type">
      <option value="LDAP">LDAP</option>
      <option value="Local">Локальная</option>
    </select>

    <input
      type="text"
      class="input"
      placeholder="Логин"
      :class="{ error: errors.login }"
      v-model="local.login"
    />

    <input
      v-if="local.type === 'Local'"
      type="password"
      class="input"
      placeholder="Пароль"
      :class="{ error: errors.password }"
      v-model="local.password"
    />

    <button class="delete-btn" @click="emit('delete')">🗑</button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  account: { type: Object, required: true }
})
const emit = defineEmits(['update', 'delete'])

const local = ref({ ...props.account })
const errors = ref({})


const labelsString = computed({
  get: () => local.value.labels?.map(l => l.text).join('; ') || '',
  set: (val) => {
    local.value.labels = val.split(';').map(l => ({ text: l.trim() })).filter(l => l.text)
  }
})
function updateLabels() {
  emit('update', { ...local.value })
}


function validate() {
  errors.value = {}
  if (!local.value.login) errors.value.login = 'Логин обязателен'
  if (local.value.type === 'Local' && !local.value.password) {
    errors.value.password = 'Пароль обязателен'
  }
  return Object.keys(errors.value).length === 0
}

watch(local, (val) => {
  if (validate()) {
    emit('update', val)
  }
}, { deep: true })
</script>

<style scoped>
.account-form {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr auto;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #1976d2;
}

.error {
  border-color: red !important;
}

.delete-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
}

.delete-btn:hover {
  color: red;
}
</style>
