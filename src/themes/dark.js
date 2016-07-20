// import the base theme
import {
  indigo500,
  indigo700,
  indigo900,
  indigoA200,
  limeA200,
  limeA400,
  limeA100,
  amber500,
  grey50
} from 'material-ui/styles/colors'

export default function dark() {
  return {
    palette: {
      primary1Color: indigo500,
      primary2Color: indigo700,
      primary9Color: indigo900,
      accent1Color: limeA200,
      accent2Color: limeA400,
      accent3Color: limeA100,
      background1Color: '#272727',
      pickerHeaderColor: indigo500,
      lightText: grey50,
      greenText: limeA200,
      hoverColor: indigoA200
    }
  }
}
