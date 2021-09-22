<template>
  <div class="notFound">
    <p class="notFound__text">
      {{ $t("SORRY, We couldn’t find what you were looking for") }}
    </p>
    <img class="notFound__image" src="@/assets/images/not-found.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style lang="stylus" scoped>
.notFound {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto auto;
  width: 100%;
  max-width: 627px;

  &__text {
    getFontH2();
    margin-bottom: 25px;
    text-align: center;

    +mediaTablet() {
      getFontH1();
      margin-bottom: 25px;
      line-height: 51px;
    }
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    max-width: 440px;

    +mediaTablet() {
      margin-bottom: 53px;
      width: 440px;
      height: 340px;
    }
  }
}
</style>
