<template>
  <div class="form-group">
    <label for="confirmPassword">Confirm Password</label>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <font-awesome-icon :icon="['fas', 'unlock-alt']" />
        </span>
      </div>
      <input
        id="confirmPassword"
        v-model="form.confirmPassword"
        class="form-control"
        placeholder="Confirm password"
        type="password"
        aria-label="Password"
        required
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
