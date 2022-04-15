<template>
  <div ref="chartMap" class="map">
    <div class="wrap"></div>
  </div>
</template>

<script>
import connectSocket from '../utils/connectSocket';

const getRect = (x, y, w, h) => ({
  top: y,
  left: x,
  right: x + w,
  bottom: y + h,
});
const intersectRect = (r1, r2) => !(r2.left > r1.right
           || r2.right < r1.left
           || r2.top > r1.bottom
           || r2.bottom < r1.top);
const hideCircleByIntersect = (series, zone) => {
  series.children.values[0].eachChildren(async (circle) => {
    const [w, h] = [circle.width(), circle.height()]
    const rect = getRect(
      circle.x() - (w / 2),
      circle.y() - (h / 2),
      w,
      h,
    );
    const hasIntersect = intersectRect(zone, rect);

    if (hasIntersect) {
      circle.set('opacity', 0.1);
    } else {
      circle.set('opacity', 1);
    }
  })
};

export default {
  name: 'LiveMapChart',
  data() {
    return {
      socketIsLoading: false,
    }
  },
  mounted() {
    this.chartData = [];
    this.setSocket();

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

        projection: d3.geoMiller(),
        rotationX: -10,
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

    const addSeries = (settings = {}) => chart.series.push(am5map.MapPointSeries.new(root, settings));

    this.pointSeries0 = addSeries();
    this.pointSeries1 = addSeries();
    this.pointSeries2 = addSeries();
    this.pointSeries3 = addSeries();

    this.pointSeries0.events.on('datavalidated', () => {
      const s = this.pointSeries0;
      const [circle, label] = s.children.values[0].children.values;

      const halfCircle = circle.width() / 2
      const labelShiftY = label.get('dy');
      const labelShiftX = label.get('dx');

      const dangerZone = getRect(
        circle.x() - halfCircle,
        label.y() - halfCircle + labelShiftY,
        label.width() + halfCircle + labelShiftX,
        label.height() + halfCircle,
      );

      hideCircleByIntersect(this.pointSeries1, dangerZone);
      hideCircleByIntersect(this.pointSeries2, dangerZone);
      hideCircleByIntersect(this.pointSeries3, dangerZone);
    });

    this.pointSeries0.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 4,
        fill: am5.color(0xFFFFFF),
      })
    }));
    this.pointSeries0.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        templateField: 'labelSettings',
        fontSize: 10,
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0,
        dx: 8,
        dy: -6,
      })
    }))
    this.pointSeries1.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 4,
        fill: am5.color(0xFFFFFF),
      })
    }));

    this.pointSeries2.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 2,
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
    if (this.root) {
      this.root.dispose();
    }
    if (this.ws) {
      this.hideToasts();
      this.ws.close();
    }
  },

  methods: {
    setSocket() {
      this.ws = connectSocket(
        'user=tester01',
        (event) => {
          const data = JSON.parse(event.data);

          if (data) {
            this.updateChart(data);
          }
        },
      );
      const oldOnopen = this.ws.onopen;
      this.ws.onopen = () => {
        oldOnopen();
        this.socketIsLoading = false;
        this.$toast.clear();
      }
      const showMessage = () => {
        this.toastMessageClose = this.$toast.error(this.$t('Live update connection lost.'), {
          action: {
            class: 'liveMapChart__toast',
            text: this.$t('Try to reconnect'),
            onClick: async () => {
              this.toastMessageClose.text(this.$t('Loading...'));
              this.setSocket();
            }
          },
        });
      }
      this.ws.onclose = () => {
        this.$toast.clear();
        showMessage();
      };
      const oldError = this.ws.error;
      this.ws.onerror = () => {
        oldError();
        this.$toast.clear();
        showMessage();
      }
    },
    hideToasts() {
      this.ws.onclose = () => {
      };
      const oldError = this.ws.error;
      this.ws.onerror = () => {
        oldError();
      }
    },
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

      this.pointSeries0.data.push(points0[0]);
      if (points1.length > 0) {
        this.pointSeries0.data.removeIndex(0);
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

<style lang="stylus">
.liveMapChart__toast {
  position: relative;
  left: -8px;
  max-width: 230px;
  +mediaGiant() {
    max-width: none;
  }
}
.wrap {
  width: 100%;
  height: 100%;
  z-index: 6;
  position: absolute;
}
</style>
