<template>
  <footer class="footer">
    <div class="footer__links">
      <a
        v-for="link in footerLinks"
        :key="link.text"
        class="footer__link"
        :href="`docs/${link.docName}.pdf`"
        target="_blank"
      >
        {{ $t(link.text) }}
      </a>
    </div>

    <span class="footer__copyright"> © OTON, {{ year }} </span>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      footerLinks: [
        {
          text: 'Terms of use',
          docName: 'terms-of-use',
        },
        {
          text: 'Cookie policy',
          docName: 'cookie-policy',
        },
        {
          text: 'Privacy notice',
          docName: 'privacy-notice',
        },
      ],
    };
  },
  computed: {
    year() {
      const year = new Date();
      return year.getFullYear();
    },
  },
};
</script>

<style lang="stylus" scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 24px;
  padding: 24px 0 16px;
  border-top: 4px solid $colorFiller;
  getFont();

  +mediaTablet() {
    padding: 16px 0;
  }

  &__links {
    +mediaTablet() {
    }
  }

  &__link {
    display: block;
    width: fit-content;
    color: $colorLink;
    text-decoration: underline;
    transition: all 0.1s;

    &:hover {
      color: $colorDanger;
    }

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  &__copyright {
    display: block;
    font-weight: 700;
    opacity: 0.4;
  }
}
</style>
