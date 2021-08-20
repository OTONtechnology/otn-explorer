<template>
  <div class="footerContainer">
    <div class="borderTop" />

    <div class="footerBox">
      <div class="footerBoxRow">
        <div class="linksContainer">
          <div class="footerBoxRow">
            <div class="linksCol">
              <a
                v-for="link in datalinks"
                :key="link.text"
                class="link"
                :href="$getStaticDocument(link.docName, locale)"
                target="_blank"
              >
                {{ $t(link.text) }}
              </a>
            </div>

            <div class="linksCol">
              <a
                v-for="link in splitedLinks[1]"
                :key="link.text"
                class="link"
                :href="$getStaticDocument(link.docName, locale)"
                :style="{ color: linksColor }"
                target="_blank"
              >
                {{ $t(link.text) }}
              </a>
            </div>
          </div>
        </div>

        <div class="copyrightBox"">
          <div class="copyrightTitle">© 2021 Plazma Premier ltd</div>
          <div class="copyrightText">
            103 Sham Peng Tong Plaza, Victoria, Mahe, Seychelles
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data() {
    return {
      datalinks: [
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
    }
  },
}
</script>

<style lang="stylus" scoped>
.footerContainer {
  width: 100%;
  margin-top: auto;
  overflow: hidden;
  padding-top: 24px;
  padding-bottom: 16px;

  +mediaTablet() {
    padding: 12px 0 0;
  }
}

.row {
  margin-left: -15px;
  margin-right: -15px;
}

.borderTop {
  opacity: 0.1;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: $colorFiller;
}

.footerBox {
  flex-grow: 2;
  max-width: (1022 + 15 + 15)px;
}

.footerBoxRow {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 100%;

  +mediaTablet() {
    margin-left: -15px;
    margin-right: -15px;
  }
}

.linksContainer {
  padding: 12px 0;
  max-width: (505 + 15 + 15)px;
  width: 100%;

  & .footerBoxRow {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 90px;
    width: fit-content;
    min-width: unset;
  }

  +mediaTablet() {
    padding: 16px 15px;

    & .footerBoxRow {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}

.linksCol {
  display: flex;
  flex-direction: column;

  +mediaTablet() {
    padding: 0 15px;
  }
}

.link {
  &:not(:last-child) {
    margin-bottom: 4px;
  }
}

.copyrightBox {
  opacity: 0.4;

  +mediaTablet() {
    margin-right: 27px;
    padding: 16px 15px;
  }
}

.copyrightTitle {
  margin-bottom: 8px;
}

.copyrightText {
  max-width: (172 + 16)px;

  +mediaTablet() {
    padding-left: 16px;
  }
}
</style>
