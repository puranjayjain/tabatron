// import the base theme
import {
  indigo500,
  indigo700,
  indigo900,
  lime500,
  limeA100,
  amber500
} from 'material-ui/styles/colors'

export default function light() {
  return {
    palette: {
      primary1Color: indigo500,
      primary2Color: indigo700,
      primary9Color: indigo900,
      amber500Color: amber500,
      accent1Color: lime500,
      background1Color: 'whitesmoke',
      pickerHeaderColor: indigo500
    },
  }
}
