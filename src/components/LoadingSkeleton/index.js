import React from "react";
import { View } from "react-native";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { Container } from "../../screens/Receitas/styles";

export default function LoadingSkeleton() {
    return (
            <Placeholder Animation={Fade}>
                <PlaceholderLine width={80} />
                <PlaceholderLine width={40} />
                <PlaceholderLine width={30} />
            </Placeholder>

    );
}