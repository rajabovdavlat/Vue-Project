<template>
  <div class="accounts">
    <div class="accounts__header">
      <h2>Учетные записи</h2>
      <button @click="store.addAccount" class="add-btn">+</button>
    </div>

    <p class="hint">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p>

    <div class="accounts__table">
      <!-- Заголовки -->
      <div class="accounts__row accounts__row--header">
        <div class="cell">Метки</div>
        <div class="cell">Тип записи</div>
        <div class="cell">Логин</div>
        <div class="cell">Пароль</div>
        <div class="cell"></div>
      </div>

      <div
        v-for="acc in store.accounts"
        :key="acc.id"
        class="accounts__row"
      >
        <input
          v-model="acc.label"
          placeholder="Значение"
          class="cell"
        />
        <select v-model="acc.type" class="cell">
          <option value="local">Локальная</option>
          <option value="ldap">LDAP</option>
        </select>
        <input
          v-model="acc.login"
          placeholder="Значение"
          class="cell"
        />
        <input
          v-model="acc.password"
          type="password"
          placeholder="Пароль"
          class="cell"
        />
        <button @click="store.deleteAccount(acc.id)" class="delete-btn">🗑</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountsStore } from "../stores/accounts";
const store = useAccountsStore();
</script>

<style scoped>
.accounts {
  margin: 20px;
  font-family: sans-serif;
}

.accounts__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.accounts__header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.add-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.add-btn:hover {
  background: #0056b3;
}

.hint {
  font-size: 13px;
  color: #555;
  margin: 10px 0 15px;
}

.accounts__table {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.accounts__row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 40px;
  gap: 8px;
  padding: 8px;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.accounts__row:last-child {
  border-bottom: none;
}

.accounts__row--header {
  background: #f9f9f9;
  font-weight: bold;
  color: #444;
}

.cell {
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

select.cell {
  padding: 5px;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
}

.delete-btn:hover {
  color: #e74c3c;
}
</style>
