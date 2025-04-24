document.addEventListener('DOMContentLoaded', function() {
    // Data: month labels and occupancy percentages
    const data = [
      { month: 'Jan', value: 97 },
      { month: 'Feb', value: 72 },
      { month: 'Mar', value: 61 },
      { month: 'Apr', value: 34 },
      { month: 'May', value: 21 },
      { month: 'Jun', value: 17 },
      { month: 'Jul', value: 25 },
      { month: 'Aug', value: 18 },
      { month: 'Sep', value: 22 },
      { month: 'Oct', value: 29 },
      { month: 'Nov', value: 70 },
      { month: 'Dec', value: 99 }
    ];
  
    const svg = document.getElementById('analyticsChart');
    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;
    const maxValue = 100;
  
    // Scales
    const xScale = i => margin.left + i * (chartWidth / data.length);
    const yScale = v => margin.top + chartHeight - (v / maxValue) * chartHeight;
  
    // Draw bars, labels, and axes
    data.forEach((d, i) => {
      const segWidth = chartWidth / data.length;
      const barWidth = segWidth * 0.6;
      const barHeight = (d.value / maxValue) * chartHeight;
      const barX = xScale(i) + (segWidth - barWidth) / 2;
      const barY = margin.top + (chartHeight - barHeight);
  
      // Bar
      const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x', barX);
      rect.setAttribute('y', barY);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', d.value >= 90 ? '#2563EB' : '#669bf0');
      svg.appendChild(rect);
  
      // Month label (X-axis)
      const label = document.createElementNS('http://www.w3.org/2000/svg','text');
      label.setAttribute('x', barX + barWidth / 2);
      label.setAttribute('y', margin.top + chartHeight + 20);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', 'axis-label');
      label.textContent = d.month;
      svg.appendChild(label);
  
      // Value label
      const valLabel = document.createElementNS('http://www.w3.org/2000/svg','text');
      valLabel.setAttribute('x', barX + barWidth / 2);
      valLabel.setAttribute('y', barY - 5);
      valLabel.setAttribute('text-anchor', 'middle');
      valLabel.setAttribute('class', 'axis-label');
      valLabel.textContent = d.value;
      svg.appendChild(valLabel);
    });
  
    // Y-axis line
    const axisLeft = document.createElementNS('http://www.w3.org/2000/svg','line');
    axisLeft.setAttribute('x1', margin.left);
    axisLeft.setAttribute('y1', margin.top);
    axisLeft.setAttribute('x2', margin.left);
    axisLeft.setAttribute('y2', margin.top + chartHeight);
    axisLeft.setAttribute('stroke', '#000');
    svg.appendChild(axisLeft);
  
    // Y-axis label
    const yLabel = document.createElementNS('http://www.w3.org/2000/svg','text');
    yLabel.setAttribute('x', margin.left - 30);
    yLabel.setAttribute('y', margin.top + chartHeight / 2);
    yLabel.setAttribute('transform', `rotate(-90, ${margin.left - 30}, ${margin.top + chartHeight / 2})`);
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('class', 'axis-label');
    yLabel.textContent = 'Occupancy %';
    svg.appendChild(yLabel);
  
    // X-axis line
    const axisBottom = document.createElementNS('http://www.w3.org/2000/svg','line');
    axisBottom.setAttribute('x1', margin.left);
    axisBottom.setAttribute('y1', margin.top + chartHeight);
    axisBottom.setAttribute('x2', margin.left + chartWidth);
    axisBottom.setAttribute('y2', margin.top + chartHeight);
    axisBottom.setAttribute('stroke', '#000');
    svg.appendChild(axisBottom);
  
    // X-axis label
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg','text');
    xLabel.setAttribute('x', margin.left + chartWidth / 2);
    xLabel.setAttribute('y', margin.top + chartHeight + 40);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('class', 'axis-label');
    xLabel.textContent = 'Month';
    svg.appendChild(xLabel);
  });
  