// import the base theme
import {
  indigo500,
  indigo700,
  indigo900,
  indigoA200,
  limeA100,
  limeA200,
  lime900,
  amber500,
  grey50
} from 'material-ui/styles/colors'

export default function light() {
  return {
    palette: {
      primary1Color: indigo500,
      primary2Color: indigo700,
      primary9Color: indigo900,
      amber500Color: amber500,
      accent1Color: limeA200,
      background1Color: 'whitesmoke',
      pickerHeaderColor: indigo500,
      lightText: grey50,
      greenText: lime900,
      hoverColor: indigoA200
    }
  }
}
