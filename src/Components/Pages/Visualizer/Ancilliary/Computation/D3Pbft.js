import * as d3 from "d3";
import hash from "object-hash";

export const labelPrimaryNode = (svg, label) => {
 
    svg
        .append("text")
        .attr("transform", "translate(" + (label.x + 10) + " ," + (label.y + 20) + ")")
        .attr("fill", "#02c415")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Primary");

    return svg;
};

export const labelFaultyNode = (svg, label, relativeSpecialLabelFont) => {
    svg
        .append("text")
        .attr("transform", "translate(" + (label.x + 10) + " ," + (label.y + 20) + ")")
        .attr("fill", "#fc453f")
        .style("font-size", '12px')
        .style("text-anchor", "middle")
        .text("Faulty");

    return svg;
};

export const connectionRender = (lineData, lineColor, dotColor, duration, delay, lineGen, svg, arrow, tooltipText = "Message") => {

    const divID = 'tooltip_' + hash([lineData[0].x , lineData[0].y , lineData[1].x , lineData[1].y]);

    var line = svg.append("path")
        .attr("d", lineGen(lineData))
        .attr("id", `${divID}`)
        .attr("stroke", lineColor)
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .attr("marker-end", `url(#arrow-&${arrow})`)
        .style("opacity", 0)
        .style("cursor", "pointer")

    var tooltip = svg.append("foreignObject")
        .append("div")
        .attr("id", `#${divID}`)
        .attr("class", "tooltip")
        .style("opacity", 0)
        .attr("class", "absolute px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg pointer-events-none")

    line.transition()
        .duration(duration / 2)
        .delay(delay)
        .style("opacity", 1)
        .on("end", function () {
            let dot = svg.append("circle")
                .attr("r", 5)
                .attr("fill", `${dotColor}`)
                .attr("cx", lineData[0][0])
                .attr("cy", lineData[0][1])
                .style("opacity", 0);

            dot.transition()
                .duration(duration / 2)
                .style("opacity", 1)
                .attrTween("cx", function () {
                    return function (t) {
                        var interpolatedPoint = line.node().getPointAtLength(t * line.node().getTotalLength());
                        return interpolatedPoint.x;
                    };
                })
                .attrTween("cy", function () {
                    return function (t) {
                        var interpolatedPoint = line.node().getPointAtLength(t * line.node().getTotalLength());
                        return interpolatedPoint.y;
                    };
                });
        })

    d3.select(`#${divID}`)
        .on('mouseover', function (e, d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 1)
        })
        .on("mousemove", function (e, d) {
            tooltip.html(tooltipText)
                .style("left", (e.pageX) + "px")
                .style("top", (e.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}
