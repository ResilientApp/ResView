import { ResponsiveLine } from "@nivo/line";
import { useContext } from "react";
import { GraphViewContext } from "../../../../../Context/graph";
import { ThemeContext } from "../../../../../Context/theme";

const themeObj = {
    "text": {
        "fontSize": 12,
        "fill": "#333333",
        "outlineWidth": 0,
        "outlineColor": "transparent"
    },
    "axis": {
        "domain": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            }
        },
        "legend": {
            "text": {
                "fontSize": 15,
                "fill": "#c4c4c4",
                "outlineWidth": 3,
                "outlineColor": "transparent",
            }
        },
        "ticks": {
            "line": {
                "stroke": "#777777",
                "strokeWidth": 1
            },
            "text": {
                "fontSize": 13,
                "fill": "#c4c4c4",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "grid": {
        "line": {
            "stroke": "#c4c4c4",
            "strokeWidth": 0.5,
        }
    },
    "legends": {
        "title": {
            "text": {
                "fontSize": 13,
                "fill": "#c4c4c4",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        },
        "text": {
            "fontSize": 13,
            "fill": "#c4c4c4",
            "outlineWidth": 0,
            "outlineColor": "transparent"
        },
        "ticks": {
            "line": {},
            "text": {
                "fontSize": 10,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": "transparent"
            }
        }
    },
    "annotations": {
        "text": {
            "fontSize": 13,
            "fill": "#333333",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "link": {
            "stroke": "#000000",
            "strokeWidth": 1,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "outline": {
            "stroke": "#000000",
            "strokeWidth": 2,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "symbol": {
            "fill": "#000000",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        }
    },
    "tooltip": {
        "container": {
            "background": "#ffffff",
            "color": "#333333",
            "fontSize": 12
        },
        "basic": {},
        "chip": {},
        "table": {},
        "tableCell": {},
        "tableCellValue": {}
    }
}

const MvtGraph = ({ chartData, chartMaxData, mvtGraphNo }) => {
    const { theme } = useContext(ThemeContext)

    const graphTheme = theme ? themeObj : {
        ...themeObj,
        axis: {
            ...themeObj.axis, 
            legend: {
                text: {
                    ...themeObj.axis.legend.text,
                    "fill": "#2c2e2d",
                }
            },
            ticks: {
                ...themeObj.axis.ticks,
                text: {
                    ...themeObj.axis.ticks.text,
                    "fill": "#2c2e2d",
                }
            }
        },
        legends: {
            ...themeObj.legends,
            text: {
                ...themeObj.legends.text,
                "fill": "#2c2e2d",
            },
        },
        grid: {
            line: {
                ...themeObj.grid.line,
                "stroke": "#5d5e5e",
            }
        },
    };

    return (
        <ResponsiveLine
            data={chartData[mvtGraphNo]}
            margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
            xScale={{
                type: "linear",
                min: "auto",
                max: chartMaxData[mvtGraphNo] + 100 ?? "auto",
                stacked: false,
                reverse: false,
            }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            xFormat=' >-.2f'
            yFormat=' >-.2f'
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time Since Replica Started Accepting Messages(10^-5 seconds)",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Messages",
                legendOffset: -40,
                legendPosition: "middle",
            }}
            enablePoints={true}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={- 12}
            useMesh={true}
            legends={
                [
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]
            }
            theme={graphTheme}
        />
    );
}

export default MvtGraph