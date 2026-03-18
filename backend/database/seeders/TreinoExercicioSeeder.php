<?php

namespace Database\Seeders;

use App\Models\Exercicio;
use App\Models\Treino;
use Illuminate\Database\Seeder;

class TreinoExercicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $treinos = [
            [
                'codigo_treino' => 'A',
                'nome_treino' => 'Full Body (Base)',
                'objetivo' => 'Adaptacao geral e base de forca.',
                'exercicios' => [
                    ['ordem' => 1, 'nome' => 'Agachamento livre', 'series' => '3', 'repeticoes_tempo' => '10', 'observacao' => null],
                    ['ordem' => 2, 'nome' => 'Supino reto', 'series' => '3', 'repeticoes_tempo' => '10', 'observacao' => null],
                    ['ordem' => 3, 'nome' => 'Remada curvada', 'series' => '3', 'repeticoes_tempo' => '10', 'observacao' => null],
                    ['ordem' => 4, 'nome' => 'Desenvolvimento militar', 'series' => '3', 'repeticoes_tempo' => '12', 'observacao' => null],
                    ['ordem' => 5, 'nome' => 'Prancha', 'series' => '3', 'repeticoes_tempo' => '30-45s', 'observacao' => null],
                ],
            ],
            [
                'codigo_treino' => 'B',
                'nome_treino' => 'Inferiores (Pernas/Gluteos)',
                'objetivo' => 'Foco em pernas e gluteos.',
                'exercicios' => [
                    ['ordem' => 1, 'nome' => 'Leg press', 'series' => '4', 'repeticoes_tempo' => '12', 'observacao' => null],
                    ['ordem' => 2, 'nome' => 'Afundo (passada)', 'series' => '3', 'repeticoes_tempo' => '10', 'observacao' => 'Cada perna.'],
                    ['ordem' => 3, 'nome' => 'Mesa flexora', 'series' => '3', 'repeticoes_tempo' => '12', 'observacao' => null],
                    ['ordem' => 4, 'nome' => 'Cadeira extensora', 'series' => '3', 'repeticoes_tempo' => '12', 'observacao' => null],
                    ['ordem' => 5, 'nome' => 'Elevacao pelvica', 'series' => '4', 'repeticoes_tempo' => '10', 'observacao' => null],
                ],
            ],
            [
                'codigo_treino' => 'C',
                'nome_treino' => 'Superiores (Peito/Costas/Ombros)',
                'objetivo' => 'Hipertrofia de tronco.',
                'exercicios' => [
                    ['ordem' => 1, 'nome' => 'Supino inclinado', 'series' => '4', 'repeticoes_tempo' => '10', 'observacao' => null],
                    ['ordem' => 2, 'nome' => 'Puxada na barra (pulldown)', 'series' => '4', 'repeticoes_tempo' => '10', 'observacao' => null],
                    ['ordem' => 3, 'nome' => 'Remada baixa', 'series' => '3', 'repeticoes_tempo' => '12', 'observacao' => null],
                    ['ordem' => 4, 'nome' => 'Elevacao lateral', 'series' => '3', 'repeticoes_tempo' => '15', 'observacao' => null],
                    ['ordem' => 5, 'nome' => 'Rosca direta', 'series' => '3', 'repeticoes_tempo' => '12', 'observacao' => null],
                ],
            ],
            [
                'codigo_treino' => 'D',
                'nome_treino' => 'Condicionamento + Core',
                'objetivo' => 'Condicionamento e core.',
                'exercicios' => [
                    ['ordem' => 1, 'nome' => 'HIIT na esteira/bike', 'series' => '1', 'repeticoes_tempo' => '10-15 min', 'observacao' => '30s forte / 60s leve.'],
                    ['ordem' => 2, 'nome' => 'Burpee', 'series' => '3', 'repeticoes_tempo' => '10', 'observacao' => null],
                    ['ordem' => 3, 'nome' => 'Abdominal infra', 'series' => '3', 'repeticoes_tempo' => '15', 'observacao' => null],
                    ['ordem' => 4, 'nome' => 'Prancha lateral', 'series' => '3', 'repeticoes_tempo' => '30s', 'observacao' => 'Cada lado.'],
                    ['ordem' => 5, 'nome' => 'Alongamento final', 'series' => '1', 'repeticoes_tempo' => '5 min', 'observacao' => null],
                ],
            ],
        ];

        foreach ($treinos as $dadosTreino) {
            $exercicios = $dadosTreino['exercicios'];
            unset($dadosTreino['exercicios']);

            $treino = Treino::updateOrCreate(
                ['codigo_treino' => $dadosTreino['codigo_treino']],
                $dadosTreino
            );

            $dadosPivot = [];

            foreach ($exercicios as $dadosExercicio) {
                $exercicio = Exercicio::updateOrCreate(
                    ['nome_exercicio' => $dadosExercicio['nome']],
                    []
                );

                $dadosPivot[$exercicio->id_exercicio] = [
                    'ordem_exercicio' => $dadosExercicio['ordem'],
                    'series' => $dadosExercicio['series'],
                    'repeticoes_tempo' => $dadosExercicio['repeticoes_tempo'],
                    'observacao' => $dadosExercicio['observacao'],
                ];
            }

            $treino->exercicios()->sync($dadosPivot);
        }
    }
}
