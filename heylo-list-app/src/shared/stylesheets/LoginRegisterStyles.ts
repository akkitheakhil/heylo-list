import { APP_COLORS } from "@theme/colors";
import { APP_FONTS } from "@theme/fonts";
import {
    StyleSheet
} from 'react-native';

export const LoginRegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: APP_COLORS.BACKGROUND_COLOR,
        padding: 24,
    },
    header: {
        marginBottom: 24,
    },
    header_text: {
        fontSize: APP_FONTS.FONT_SIZE_XXL,
        color: APP_COLORS.COLOR_WHITE,
        fontFamily: APP_FONTS.FONT_FAMILY_SEMI_BOLD,
        padding: 0,
    },
    caption_text: {
        fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
        color: APP_COLORS.TEXT_COLOR_SECONDARY,
        fontFamily: APP_FONTS.FONT_FAMILY_MEDIUM,
        padding: 0,
    },
    social_button_container: {
        paddingVertical: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    form_container: {
        paddingBottom: 24,
        flexDirection: "column",
    },
    actions_container: {
        paddingVertical: 12,
        flexDirection: "column",
        flex: 1,
    },

    secondary_action: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    secondary_action_text: {
        fontFamily: APP_FONTS.FONT_FAMILY_MEDIUM,
        fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
        color: APP_COLORS.COLOR_WHITE,
    },

    secondary_action_text_cta: {
        color: APP_COLORS.SECONDARY,
    },

    loading_screen_view: {
        position: "absolute",
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: APP_COLORS.COLOR_WHITE,
        opacity: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    authentication_error: {
        color: APP_COLORS.COLOR_RED,
        fontFamily: APP_FONTS.FONT_FAMILY_MEDIUM,
        fontSize: APP_FONTS.FONT_SIZE_MEDIUM,
    }
});
