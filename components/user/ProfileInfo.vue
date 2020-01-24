<template>
  <div
    class="profile-info right-block__content right-block__content_with-padding"
  >
    <div class="row">
      <div class="col-xs-6">
        Name:
      </div>

      <div class="col-xs-6">
        {{ $auth.user.name }}
      </div>
    </div>

    <div class="row">
      <div class="col-xs-6">
        Phone:
      </div>

      <div class="col-xs-6">
        {{ $auth.user.phone }}
      </div>
    </div>

    <div class="row">
      <div class="col-xs-6">
        Email:
      </div>

      <div class="col-xs-6">
        {{ $auth.user.email }}
      </div>
    </div>

    <div class="row">
      <div class="col-xs-6">
        Address:
      </div>

      <div class="col-xs-6">
        {{ $auth.user.email }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileInfo'
}
</script>
