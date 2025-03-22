import { useEffect } from 'react';

type ChartConfig = {
  type: string;
  data: any;
  options: any;
};

export function useCharts() {
  useEffect(() => {
    // Function to initialize charts when DOM is fully loaded
    const initializeCharts = () => {
      console.log('Initializing charts...');
      
      // Add Chart.js from CDN if it's not already loaded
      if (!(window as any).Chart) {
        console.log('Loading Chart.js from CDN...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        
        script.onload = () => {
          console.log('Chart.js loaded successfully');
          // Execute chart generation after a small delay to ensure DOM is ready
          setTimeout(() => {
            console.log('Generating charts...');
            generateCharts();
          }, 500);
        };
        
        script.onerror = (error) => {
          console.error('Failed to load Chart.js:', error);
        };
        
        document.body.appendChild(script);
      } else {
        // Chart.js already loaded, directly generate charts
        console.log('Chart.js already loaded, generating charts...');
        setTimeout(() => {
          generateCharts();
        }, 100);
      }
    };

    // Function to generate charts based on the diagnosis result
    const generateCharts = () => {
      if (!(window as any).Chart) {
        console.error('Chart.js not loaded yet');
        return;
      }

      // Check if we're on the results page
      const resultsCard = document.querySelector('[data-results="true"]');
      if (!resultsCard) {
        console.log('Results card not visible yet');
        return;
      }

      // Determine if showing PD or healthy result
      const diagnosis = document.querySelector('[data-diagnosis]');
      const isPD = diagnosis?.getAttribute('data-diagnosis') === 'positive';
      
      console.log(`Generating charts for diagnosis: ${isPD ? 'Parkinson\'s' : 'Healthy'}`);

      const charts = [
        {
          id: 'jerkChart',
          config: generateJerkAnalysis(isPD)
        },
        {
          id: 'strokeChart',
          config: generateStrokeAnalysis(isPD)
        },
        {
          id: 'temporalChart',
          config: generateTemporalPattern(isPD)
        },
        {
          id: 'featureChart',
          config: generateFeatureImportance()
        },
        {
          id: 'modelComparisonChart',
          config: generateModelComparison()
        }
      ];

      // Initialize each chart
      charts.forEach(chart => {
        const canvas = document.getElementById(chart.id) as HTMLCanvasElement;
        if (canvas) {
          // Clear any existing chart
          const chartInstance = (window as any).Chart.getChart(canvas);
          if (chartInstance) {
            chartInstance.destroy();
          }
          
          try {
            // Wait a bit for canvas to be fully ready
            setTimeout(() => {
              try {
                // Create new chart
                new (window as any).Chart(canvas.getContext('2d'), chart.config);
                console.log(`Chart ${chart.id} created successfully`);
              } catch (error) {
                console.error(`Error creating chart ${chart.id} after delay:`, error);
              }
            }, 100);
          } catch (error) {
            console.error(`Error creating chart ${chart.id}:`, error);
          }
        } else {
          console.warn(`Canvas with ID ${chart.id} not found`);
        }
      });

      // Generate confusion matrix
      setTimeout(() => {
        generateConfusionMatrix();
      }, 200);
    };

    // Helper functions to generate chart configurations
    function generateJerkAnalysis(isPD: boolean): ChartConfig {
      // Generate random data with appropriate distribution based on diagnosis
      const jerkMagnitude = Array.from({ length: 30 }, () =>
        isPD
          ? Math.random() * 0.8 + 0.6 // Higher values for PD
          : Math.random() * 0.4 + 0.2 // Lower values for healthy
      );

      return {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Jerk Magnitude',
              data: jerkMagnitude,
              backgroundColor: isPD ? 'rgba(220, 53, 69, 0.5)' : 'rgba(25, 135, 84, 0.5)',
              borderColor: isPD ? 'rgb(220, 53, 69)' : 'rgb(25, 135, 84)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Jerk Magnitude Distribution'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Magnitude'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Sample'
              }
            }
          }
        }
      };
    }

    function generateStrokeAnalysis(isPD: boolean): ChartConfig {
      // Generate random data with appropriate distribution based on diagnosis
      const strokeFeature = Array.from({ length: 30 }, () =>
        isPD
          ? Math.random() * 0.7 + 0.5 // Higher values for PD
          : Math.random() * 0.3 + 0.1 // Lower values for healthy
      );

      return {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Stroke Feature',
              data: strokeFeature,
              backgroundColor: isPD ? 'rgba(13, 110, 253, 0.5)' : 'rgba(25, 135, 84, 0.5)',
              borderColor: isPD ? 'rgb(13, 110, 253)' : 'rgb(25, 135, 84)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Stroke Feature Distribution'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Value'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Sample'
              }
            }
          }
        }
      };
    }

    function generateTemporalPattern(isPD: boolean): ChartConfig {
      // Generate time steps
      const timeSteps = Array.from({ length: 20 }, (_, i) => i + 1);

      // Generate velocity data
      const pdVelocity = timeSteps.map(() =>
        isPD
          ? (Math.random() * 0.4 + 0.2) * (1 + Math.sin(Math.random() * 2)) // More variable for PD
          : (Math.random() * 0.2 + 0.6) * (1 + Math.sin(Math.random()) * 0.3) // More consistent for healthy
      );

      const healthyVelocity = timeSteps.map(() =>
        (Math.random() * 0.2 + 0.6) * (1 + Math.sin(Math.random()) * 0.3) // Consistent for healthy
      );

      // Generate acceleration data
      const pdAcceleration = timeSteps.map(() =>
        isPD
          ? (Math.random() * 0.5 + 0.1) * (1 + Math.sin(Math.random() * 3)) // More variable for PD
          : (Math.random() * 0.2 + 0.3) * (1 + Math.sin(Math.random()) * 0.2) // More consistent for healthy
      );

      return {
        type: 'line',
        data: {
          labels: timeSteps,
          datasets: [
            {
              label: 'Velocity (Current)',
              data: pdVelocity,
              borderColor: isPD ? 'rgb(220, 53, 69)' : 'rgb(25, 135, 84)',
              backgroundColor: 'transparent',
              borderWidth: 2
            },
            {
              label: 'Acceleration (Current)',
              data: pdAcceleration,
              borderColor: isPD ? 'rgb(253, 126, 20)' : 'rgb(13, 110, 253)',
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderDash: [5, 5]
            },
            {
              label: 'Velocity (Healthy Reference)',
              data: healthyVelocity,
              borderColor: 'rgb(108, 117, 125)',
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderDash: [2, 2]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Temporal Motor Patterns Comparison'
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Normalized Values'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Time Steps'
              }
            }
          }
        }
      };
    }

    function generateFeatureImportance(): ChartConfig {
      // Feature names
      const features = [
        'Jerk Variability',
        'Pressure Inconsistency',
        'Velocity STD',
        'Acceleration Mean',
        'Grip Angle',
        'Stroke Count',
        'Duration',
        'Directional Control'
      ];

      // Generate random importance scores (sorted)
      const scores = [
        Math.random() * 0.2 + 0.8, // Jerk Variability (highest)
        Math.random() * 0.15 + 0.7, // Pressure Inconsistency
        Math.random() * 0.15 + 0.6, // Velocity STD
        Math.random() * 0.1 + 0.5, // Acceleration Mean
        Math.random() * 0.1 + 0.4, // Grip Angle
        Math.random() * 0.1 + 0.3, // Stroke Count
        Math.random() * 0.1 + 0.2, // Duration
        Math.random() * 0.1 + 0.1 // Directional Control (lowest)
      ];

      return {
        type: 'bar',
        data: {
          labels: features,
          datasets: [
            {
              label: 'Feature Importance',
              data: scores,
              backgroundColor: [
                'rgba(220, 53, 69, 0.8)',
                'rgba(220, 53, 69, 0.7)',
                'rgba(220, 53, 69, 0.6)',
                'rgba(220, 53, 69, 0.5)',
                'rgba(220, 53, 69, 0.4)',
                'rgba(220, 53, 69, 0.3)',
                'rgba(220, 53, 69, 0.2)',
                'rgba(220, 53, 69, 0.1)'
              ],
              borderColor: 'rgb(220, 53, 69)',
              borderWidth: 1
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Feature Importance'
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 1,
              title: {
                display: true,
                text: 'Importance Score'
              }
            }
          }
        }
      };
    }

    function generateModelComparison(): ChartConfig {
      // Models
      const models = ['Stacked Ensemble', 'SVM', 'Gradient Boosting', 'KNN', 'Random Forest'];

      // Generate accuracy scores (with stacked ensemble being highest)
      const accuracy = [
        0.916, // Stacked Ensemble
        0.89 + Math.random() * 0.02 - 0.01, // SVM
        0.78 + Math.random() * 0.04 - 0.02, // Gradient Boosting
        0.75 + Math.random() * 0.04 - 0.02, // KNN
        0.62 + Math.random() * 0.04 - 0.02 // Random Forest
      ];

      // Generate F1 scores (slightly lower than accuracy)
      const f1 = accuracy.map(a => a - Math.random() * 0.05);

      // Generate ROC AUC scores (similar to accuracy)
      const rocAuc = accuracy.map(a => a + Math.random() * 0.04 - 0.02);

      return {
        type: 'bar',
        data: {
          labels: models,
          datasets: [
            {
              label: 'Accuracy',
              data: accuracy,
              backgroundColor: 'rgba(13, 110, 253, 0.7)',
              borderColor: 'rgb(13, 110, 253)',
              borderWidth: 1
            },
            {
              label: 'F1 Score',
              data: f1,
              backgroundColor: 'rgba(108, 117, 125, 0.7)',
              borderColor: 'rgb(108, 117, 125)',
              borderWidth: 1
            },
            {
              label: 'ROC AUC',
              data: rocAuc,
              backgroundColor: 'rgba(32, 201, 151, 0.7)',
              borderColor: 'rgb(32, 201, 151)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Model Performance Comparison'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 1,
              title: {
                display: true,
                text: 'Score'
              }
            }
          }
        }
      };
    }

    function generateConfusionMatrix() {
      const container = document.getElementById('confusionMatrix');
      if (!container) return;
      
      container.innerHTML = '';

      // Create SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '0 0 220 180');
      container.appendChild(svg);

      // Determine if showing PD or healthy result
      const diagnosis = document.querySelector('[data-diagnosis]');
      const isPD = diagnosis?.getAttribute('data-diagnosis') === 'positive';

      // Define confusion matrix values
      // [TN, FP, FN, TP]
      const values = [
        Math.floor(Math.random() * 5) + 50, // TN (Healthy correctly identified)
        Math.floor(Math.random() * 5) + 5, // FP (Healthy misclassified as PD)
        Math.floor(Math.random() * 5) + 8, // FN (PD misclassified as Healthy)
        Math.floor(Math.random() * 5) + 85 // TP (PD correctly identified)
      ];

      // Calculate total
      const total = values.reduce((a, b) => a + b, 0);

      // Calculate percentages
      const percentages = values.map(v => ((v / total) * 100).toFixed(1) + '%');

      // Define cell size and padding
      const cellSize = 80;
      const padding = 10;

      // Define colors
      const colors = [
        'rgba(25, 135, 84, 0.7)', // TN - Green
        'rgba(255, 193, 7, 0.7)', // FP - Yellow
        'rgba(255, 193, 7, 0.7)', // FN - Yellow
        'rgba(220, 53, 69, 0.7)' // TP - Red
      ];

      // Draw cells
      const cells = [
        { row: 0, col: 0, value: values[0], percent: percentages[0], label: 'TN' },
        { row: 0, col: 1, value: values[1], percent: percentages[1], label: 'FP' },
        { row: 1, col: 0, value: values[2], percent: percentages[2], label: 'FN' },
        { row: 1, col: 1, value: values[3], percent: percentages[3], label: 'TP' }
      ];

      cells.forEach((cell, i) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', (padding + cell.col * cellSize).toString());
        rect.setAttribute('y', (padding + cell.row * cellSize).toString());
        rect.setAttribute('width', cellSize.toString());
        rect.setAttribute('height', cellSize.toString());
        rect.setAttribute('fill', colors[i]);
        rect.setAttribute('stroke', '#333');
        rect.setAttribute('stroke-width', '1');
        rect.setAttribute('rx', '4');
        svg.appendChild(rect);

        const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text1.setAttribute('x', (padding + cell.col * cellSize + cellSize / 2).toString());
        text1.setAttribute('y', (padding + cell.row * cellSize + cellSize / 2).toString());
        text1.setAttribute('text-anchor', 'middle');
        text1.setAttribute('dominant-baseline', 'middle');
        text1.setAttribute('font-weight', 'bold');
        text1.setAttribute('font-size', '16');
        text1.setAttribute('fill', '#000');
        text1.textContent = cell.value.toString();
        svg.appendChild(text1);

        const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text2.setAttribute('x', (padding + cell.col * cellSize + cellSize / 2).toString());
        text2.setAttribute('y', (padding + cell.row * cellSize + cellSize / 2 + 20).toString());
        text2.setAttribute('text-anchor', 'middle');
        text2.setAttribute('dominant-baseline', 'middle');
        text2.setAttribute('font-size', '12');
        text2.setAttribute('fill', '#000');
        text2.textContent = cell.percent;
        svg.appendChild(text2);

        const text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text3.setAttribute('x', (padding + cell.col * cellSize + cellSize / 2).toString());
        text3.setAttribute('y', (padding + cell.row * cellSize + cellSize / 2 - 20).toString());
        text3.setAttribute('text-anchor', 'middle');
        text3.setAttribute('dominant-baseline', 'middle');
        text3.setAttribute('font-size', '12');
        text3.setAttribute('fill', '#555');
        text3.textContent = cell.label;
        svg.appendChild(text3);
      });

      // Add labels
      const labels = [
        { text: 'Predicted', x: padding + cellSize, y: padding - 20 },
        { text: 'Actual', x: padding - 40, y: padding + cellSize / 2, rotate: true }
      ];

      labels.forEach(label => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', label.x.toString());
        text.setAttribute('y', label.y.toString());
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#555');

        if (label.rotate) {
          text.setAttribute('transform', `rotate(-90, ${label.x}, ${label.y})`);
        }

        text.textContent = label.text;
        svg.appendChild(text);
      });

      // Add class labels
      const classLabels = [
        { text: 'Healthy', x: padding + cellSize / 2, y: padding - 5 },
        { text: 'PD', x: padding + cellSize + cellSize / 2, y: padding - 5 },
        { text: 'Healthy', x: padding - 5, y: padding + cellSize / 2, rotate: true },
        { text: 'PD', x: padding - 5, y: padding + cellSize + cellSize / 2, rotate: true }
      ];

      classLabels.forEach(label => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', label.x.toString());
        text.setAttribute('y', label.y.toString());
        text.setAttribute('text-anchor', label.rotate ? 'middle' : 'middle');
        text.setAttribute('dominant-baseline', label.rotate ? 'auto' : 'auto');
        text.setAttribute('font-size', '10');
        text.setAttribute('fill', '#777');

        if (label.rotate) {
          text.setAttribute('transform', `rotate(-90, ${label.x}, ${label.y})`);
        }

        text.textContent = label.text;
        svg.appendChild(text);
      });
    }

    // Run once after component is mounted
    initializeCharts();

    // Add a MutationObserver to detect when results become visible
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-results') {
          const resultsVisible = (mutation.target as HTMLElement).getAttribute('data-results') === 'true';
          if (resultsVisible) {
            console.log('Results now visible, initializing charts');
            // Wait a bit for the DOM to fully update before generating charts
            setTimeout(() => {
              generateCharts();
            }, 300);
          }
        }
      });
    });

    // Start observing the document body for any elements with data-results attribute
    document.querySelectorAll('[data-results]').forEach(el => {
      observer.observe(el, { attributes: true });
    });

    // Also set up a DOM change observer to catch when results are added to the DOM
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const resultsCard = document.querySelector('[data-results="true"]');
        if (resultsCard) {
          console.log('Results card detected in DOM, initializing charts');
          // Wait for the DOM to be fully ready
          setTimeout(() => {
            generateCharts();
          }, 300);

          // Also observe this specific element for attribute changes
          observer.observe(resultsCard, { attributes: true });
        }
      });
    });

    // Observe the body for DOM changes
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // Clean up observers on unmount
    return () => {
      observer.disconnect();
      bodyObserver.disconnect();
    };
  }, []);
}
