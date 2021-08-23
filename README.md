# otn-explorer

### Styles

в каждом блоке `<style lang="stylus"></style>` доступны переменные из /src/assets/styles/vars.styl

### Описание функций utils

- declension - склонение существительных в зависимости от количества


### Работа с медиа файлами

- svg иконки подключаются с помощью плагина @nuxtjs/svg-sprite. Иконки должны быть расположены в /src/assets/svg
  _Пример:_

  ```html
  <svg-icon name="svg" class="svg" />
  ```

### VUE local snippets

#### vue

- **vue file** - Get empty vue file template with script and style stylus scoped

  - prefix - vuet

#### vue-html

- **placeholder** - get a pic img placeholder by with and height from //via.placeholder.com

  - example:

    - //via.placeholder.com/50x50

- **Get svg**

  - prefix - svg

  - ```html
    <svg-icon name="$1" class="$2" />

    ```

- **Get translation string**

  - prefix - tr

  - ```html
    {{ $t('$1') }}
    ```
