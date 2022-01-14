import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Background, Titulo, BackgroundClaro, Descricao } from "../../Styles"
import BackButtonSolid from "../../Components/Buttons/BackButtonSolid"
 

const TermsOfUse = () => {
	return (
		<View style={styles.container}>
			<BackButtonSolid />
			<Text style={styles.termos}>Termos de Uso</Text>
				<ScrollView style={styles.containerTermos}>
					<Text style={styles.descricaoTermos} allowFontScaling={true}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in sapien at erat ornare gravida at sit amet augue. Ut in eleifend odio. Duis in enim nec lacus cursus mattis sit amet eu nisi.
						Nullam justo nunc, accumsan tempor venenatis et, bibendum at enim. Maecenas mollis est vel efficitur sodales. Duis et dapibus enim, at euismod dolor.
						Proin vitae imperdiet est, eu convallis ante. Cras et luctus lacus. Nullam non leo cursus, fermentum lacus id, dapibus lorem. Nulla metus enim, vehicula vitae interdum sed, pretium porta sapien.
						Phasellus imperdiet sem lorem, at volutpat risus vulputate vel. Donec vel tellus sodales, porttitor est eu, varius nisl. Phasellus et nunc sed turpis fringilla gravida. Morbi suscipit ac metus eu semper.
						Nullam justo nunc, accumsan tempor venenatis et, bibendum at enim. Maecenas mollis est vel efficitur sodales. Duis et dapibus enim, at euismod dolor.
						Proin vitae imperdiet est, eu convallis ante. Cras et luctus lacus. Nullam non leo cursus, 
					</Text>
				</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Background,
		padding: 20
	},
	termos:{
		fontFamily: Titulo,
		fontSize: 30,
		color: 'white',
		marginVertical: 20
	},
	containerTermos:{
		backgroundColor: BackgroundClaro,
		borderRadius: 15,
		padding: 10
	},
	descricaoTermos:{
		fontFamily: Descricao,
		fontSize: 12,
		color: 'white'
	}
})

export default TermsOfUse