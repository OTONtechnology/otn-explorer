<template>
  <div class="container">
    <div ref="chartMap" class="map" />
  </div>
</template>

<script>
/* eslint-disable no-undef */

import { geoMiller } from 'd3-geo-projection';
// import * as am5 from '@amcharts/amcharts5'

export default {
  name: 'LiveMap',

  layout: 'darkMap',

  data() {
    return {}
  },

  head: {
    script: [
      { src: 'https://cdn.amcharts.com/lib/5/index.js' },
      { src: 'https://cdn.amcharts.com/lib/5/map.js' },
      { src: 'https://cdn.amcharts.com/lib/5/geodata/worldLow.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },

  computed: {

  },

  mounted() {
    const root = am5.Root.new(this.$refs.chartMap);
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        wheelX: 'none',
        wheelY: 'none',

        projection: geoMiller()
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: window.am5geodata_worldLow,
        exclude: ['AQ'],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x233940),
      stroke: am5.color(0x596A71),
      strokeWidth: 0.5,
    });

    const pointSeries1 = chart.series.push(
      am5map.MapPointSeries.new(root, {
        geoJSON: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                name: 'Kirov',
                ip: '84.244.54.162:8333',
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  49.66007, 58.59665
                ]
              }
            }
          ]
        }
      })
    );
    const pointSeries2 = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: 'country'
      })
    );
    const pointSeries3 = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: 'country'
      })
    );
    pointSeries1.bullets.push(() => {
      const circle = am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xFFFFFF),
        tooltipText: '[fontSize: 10px #fff]{name}[/][/]\n[fontSize: 10px #7b888c]{ip}[/][/]',

        showTooltipOn: 'always',
        tooltipY: 12,
      });

      const tooltip = am5.Tooltip.new(root, {
        pointerOrientation: 'left',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6,
        getFillFromSprite: false,
        getStrokeFromSprite: false
      });

      tooltip.get('background').setAll({
        stroke: am5.color(0x000000),
        strokeOpacity: 0
      });

      circle.set('tooltip', tooltip);

      return am5.Bullet.new(root, {
        sprite: circle
      })
    });
    pointSeries2.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 3,
        fill: am5.color(0xFFFFFF),
        fillOpacity: 0.5
      })
    }));
    pointSeries3.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 2,
        fill: am5.color(0xFFFFFF),
        fillOpacity: 0.2
      })
    }));

    pointSeries1.data.setAll([
      {
        name: 'Reykjavik, Iceland',
        ip: '84.244.54.162:8333',
        geometry: {
          type: 'Point',
          coordinates: [49.66007, 58.59665],
        },

      }
    ]);

    pointSeries2.data.setAll([
      {
        country: 'US',
        type: 'Point',
        name: 'Reykjavik, Iceland',
        ip: '84.244.54.162:8333'
      }
    ]);
    pointSeries3.data.setAll([

      {
        country: 'MX',
        type: 'Point',
        name: 'Reykjavik, Iceland',
        ip: '84.244.54.162:8333'
      }
    ]);

    this.root = root;
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },

  destroyed() {

  },

  methods: {

  },

};
</script>

<style lang="stylus" scoped>
.container {
  padding-top: 24px;
  color: $colorFontBase;
}

.map {
  width: 100%;
  min-height: 500px;
  height: calc(100vh - 176px);
}
</style>
