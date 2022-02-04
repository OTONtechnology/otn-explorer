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

    const {
      am5, am5map, d3, am5themes_Animated: am5themesAnimated
    } = window;

    const root = am5.Root.new(this.$refs.chartMap);

    root.setThemes([
      am5themesAnimated.new(root)
    ]);

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

    this.pointSeries0 = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );
    this.pointSeries1 = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );
    this.pointSeries2 = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );
    this.pointSeries3 = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    this.pointSeries0.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xFFFFFF),
      })
    }));
    this.pointSeries0.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        templateField: 'labelSettings',
        fontSize: 10,
        centerY: am5.p50,
        dy: 5,
      })
    }))
    this.pointSeries1.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xFFFFFF),
      })
    }));

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

    chart.appear(1000, 100);

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
        labelSettings: {
          text: `${data.city ? `[#fff]${data.city}[/]\n` : ''}[#7b888c]${data.ip || ''}[/]`,
        },
      })

      this.chartData = this.chartData.slice(0, 55);

      const points0 = this.chartData.slice(0, 1);
      const points1 = this.chartData.slice(1, 11);
      const points2 = this.chartData.slice(11, 31);
      const points3 = this.chartData.slice(31, 51);

      this.pointSeries0.data.push(points0[0]);
      if (points1.length > 0) {
        this.pointSeries0.data.removeIndex(0);
      }
      if (points1.length > 0) {
        this.pointSeries1.data.push(points1[0]);
        if (points2.length > 0) {
          this.pointSeries1.data.removeIndex(0);
        }
      }

      if (points2.length > 0) {
        this.pointSeries2.data.push(points2[0]);
        if (points3.length > 0) {
          this.pointSeries2.data.removeIndex(0);
        }
      }

      if (points3.length > 0) {
        this.pointSeries3.data.push(points3[0]);
        if (this.chartData > 51) {
          this.pointSeries3.data.removeIndex(0);
        }
      }
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
