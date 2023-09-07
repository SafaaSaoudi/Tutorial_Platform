import React, { Component } from "react";

class PerformanceTest extends Component {
  constructor() {
    super();
    this.state = {
      elapsedTime: 0,
    };
  }

  componentDidMount() {
    // Mesurer le temps de calcul complexe
    const startTime = performance.now();
    this.performComplexCalculation();
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    // Mettre à jour l'état avec le temps écoulé
    this.setState({ elapsedTime });
  }

  performComplexCalculation() {
    // Simulation d'une tâche de calcul complexe
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }
    return result;
  }

  render() {
    const { elapsedTime } = this.state;

    return (
      <div>
        <h1>Test de performance React</h1>
        <p>
          Temps écoulé pour le calcul complexe : {elapsedTime} millisecondes
        </p>
      </div>
    );
  }
}

export default PerformanceTest;
