import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

@Component()
export class HomePage extends Vue {

  render () {
    return (
      <h1 class={styles.heading}>home!</h1>
    )
  }
}
