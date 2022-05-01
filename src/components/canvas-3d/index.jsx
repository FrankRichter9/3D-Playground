import Vue from 'vue'
import Component from 'vue-class-component'
import { init3DRenderer } from '../../3Dengine'

@Component()
export class Canvas3d extends Vue {

  mounted(){
    let container = this.$refs.container

    init3DRenderer(container)
  }

  render () {
    return (
      <div ref="container" style={{
        height: '800px'
      }}></div>
    )
  }
}
