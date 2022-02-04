<template>
  <div ref="chartMap" class="map" />
</template>

<script>
import connectSocket from '../utils/connectSocket'

export default {
  name: 'LiveMapChart',

  data() {
    return {

    }
  },

  computed: {

  },

  mounted() {
    this.chartData = [];
    this.ws = connectSocket(
      'user=tester01',
      (event) => {
        const data = JSON.parse(event.data);

        if (data) {
          this.updateChart(data);
        }
      },
    );

    const { am5, am5map, d3 } = window;

    const root = am5.Root.new(this.$refs.chartMap);
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        wheelX: 'none',
        wheelY: 'none',

        projection: d3.geoMiller()
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

    this.pointSeries1 = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );
    this.pointSeries2 = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: 'country'
      })
    );
    this.pointSeries3 = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: 'country'
      })
    );

    this.pointSeries1.bullets.push(() => {
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
    this.pointSeries2.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 3,
        fill: am5.color(0xFFFFFF),
        fillOpacity: 0.5
      })
    }));
    this.pointSeries3.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 2,
        fill: am5.color(0xFFFFFF),
        fillOpacity: 0.2
      })
    }));

    this.root = root;
  },

  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
    if (this.root) {
      this.root.dispose();
    }
  },

  methods: {
    updateChart(data) {
      this.chartData.unshift({
        name: data.city,
        ip: data.ip,
        geometry: {
          type: 'Point',
          coordinates: [data.lon, data.lat],
        },
      })

      this.chartData = this.chartData.slice(0, 50);
      const points1 = this.chartData.slice(0, 10);
      const points2 = this.chartData.slice(10, 30);
      const points3 = this.chartData.slice(30, 50);

      this.pointSeries1.data.setAll(points1);
      this.pointSeries2.data.setAll(points2);
      this.pointSeries3.data.setAll(points3);
    }
  },

};
</script>

<style lang="stylus" scoped>
.container {
  padding-top: 24px;
  color: $colorFontBase;
}

.map {
  position: absolute;
  z-index: 5;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}
</style>
