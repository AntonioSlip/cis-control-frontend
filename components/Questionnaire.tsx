import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Shield, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Monitor,
  Lock,
  Database,
  Settings,
  Zap
} from 'lucide-react';

interface QuestionnaireProps {
  onNavigate: (page: string) => void;
}

interface Control {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  questions: {
    id: string;
    text: string;
    helpText?: string;
  }[];
}

interface Answer {
  controlId: string;
  questionId: string;
  value: string;
}

export function Questionnaire({ onNavigate }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const router = useRouter();

  const maturityLevels = [
    { value: '0', label: 'Não Implementado', color: 'bg-red-100 text-red-800' },
    { value: '1', label: 'Parcialmente Implementado', color: 'bg-yellow-100 text-yellow-800' },
    { value: '2', label: 'Implementado', color: 'bg-blue-100 text-blue-800' },
    { value: '3', label: 'Automatizado', color: 'bg-green-100 text-green-800' }
  ];

  const cisControls: Control[] = [
    {
      id: 'inv',
      title: '1.Inventário e controle de ativos da empresa',
      description: 'Gerenciar ativamente (inventariar, rastrear e corrigir) todos os ativos da empresa (dispositivos de usuário final, incluindo portáteis e móveis; dispositivos de rede; dispositivos não informáticos / IoT - Internet das Coisas; e servidores) conectados à infraestrutura fisicamente, virtualmente, remotamente, e aqueles em ambientes de nuvem, para saber com precisão a totalidade de ativos que precisam ser monitorados e protegidos dentro da empresa. Isso também apoiará a identificação de ativos não autorizados e não gerenciados para remover ou corrigir.',
      icon: Monitor,
      questions: [
        {
          id: 'inv1',
          text: '1.1.Estabelecer e manter um inventário detalhado de ativos da empresa'
        },
        {
          id: 'inv2',
          text: '1.2.Adereçar ativos não autorizados'
        },
        {
          id: 'inv3',
          text: '1.3.Utilizar uma ferramenta de descoberta ativa',
        },
        {
          id: 'inv4',
          text: '1.4.Usar o registro do protocolo de configuração dinâmica de hosts (DHCP) para atualizar o inventário de ativos corporativos'
        },
        {
          id: 'inv5',
          text: '1.5.Usar uma ferramenta de descoberta de ativos passivos'
        }
      ]
    },
    {
      id: 'access',
      title: '2.Inventário e controle de ativos de software',
      description: 'Gerenciar ativamente (inventarie, rastreie e corrija) todos os softwares (sistemas operacionais e aplicações) na rede para que apenas softwares autorizados sejam instalados e possam ser executados, e que softwares não autorizados e não gerenciados sejam encontrados e impedidos de instalação ou execução.',
      icon: Lock,
      questions: [
        {
          id: 'acc1',
          text: '2.1.Estabelecer e manter um inventário de software'
        },
        {
          id: 'acc2',
          text: '2.2.Certificar-se de que o software autorizado seja atualmente suportado'
        },
        {
          id: 'acc3',
          text: '2.3.Adereçar a software não autorizado'
        },
        {
          id: 'acc4',
          text: '2.4.Utilize ferramentas automatizadas de inventário de software'
        },
        {
          id: 'acc5',
          text: '2.5.Lista de permissões para software autorizado'
        },
        {
          id: 'acc6',
          text: '2.6.Bibliotecas autorizadas de lista de permissões'
        },
        {
          id: 'acc7',
          text: '2.7.Scripts autorizados da lista de permissões'
        }
      ]
    },
    {
      id: 'data',
      title: '3.Proteção de Dados',
      description: 'Desenvolver processos e controles técnicos para identificar, classificar, manusear, reter e descartar dados com segurança.',
      icon: Database,
      questions: [
        {
          id: 'data1',
          text: '3.1.Estabelecer e manter um processo de gerenciamento de dados'
        },
        {
          id: 'data2',
          text: '3.2.Estabelecer e manter um inventário de dados'
        },
        {
          id: 'data3',
          text: '3.3.Configurar listas de controle de acesso a dados'
        },
        {
          id: 'data4',
          text: '3.4.Aplicar retenção de dados'
        },
        {
          id: 'data5',
          text: '3.5.Descartar de dados com segurança'
        },
        {
          id: 'data6',
          text: '3.6.Criptografar dados em dispositivos de usuário final'
        },
        {
          id: 'data7',
          text: '3.7.Estabelecer e manter um esquema de classificação de dados'
        },
        {
          id: 'data8',
          text: '3.8.Fluxos de dados de documentos'
        },
        {
          id: 'data9',
          text: '3.9.Criptografar dados em mídia removível'
        },
        {
          id: 'data10',
          text: '3.10.Criptografar dados confidenciais em trânsito'
        },
        {
          id: 'data11',
          text: '3.11.Criptografar dados confidenciais em repouso'
        },
        {
          id: 'data12',
          text: '3.12.Segmentar processamento e armazenamento de dados com base na sensibilidade'
        },
        {
          id: 'data13',
          text: '3.13.Implantar uma solução de prevenção contra perda de dados'
        },
        {
          id: 'data14',
          text: '3.14.Registrar acesso a dados confidenciais'
        },
      ]
    },
    {
      id: 'config',
      title: '4.Configuração segura de ativos corporativos e software',
      description: 'Estabelecer e manter a configuração segura de ativos corporativos (dispositivos de usuário final, incluindo portáteis e móveis; dispositivos de rede; dispositivos não informáticos / IoT; e servidores) e software (sistemas operacionais e aplicativos).',
      icon: Settings,
      questions: [
        {
          id: 'conf1',
          text: '4.1.Estabelecer e manter um processo de configuração seguro'
        },
        {
          id: 'conf2',
          text: '4.2.Estabelecer e manter um processo de configuração seguro para infraestrutura de rede'
        },
        {
          id: 'conf3',
          text: '4.3.Configurar o bloqueio automático de sessão em ativos corporativos'
        },
        {
          id: 'conf4',
          text: '4.4.Implementar e gerenciar um firewall em servidores'
        },
        {
          id: 'conf5',
          text: '4.5.Implementar e gerenciar um firewall em dispositivos de usuário final'
        },
        {
          id: 'conf6',
          text: '4.6.Gerenciar com segurança ativos corporativos e software'
        },
        {
          id: 'conf7',
          text: '4.7.Gerenciar contas padrão em ativos corporativos e software'
        },
        {
          id: 'conf8',
          text: '4.8.Desinstalar ou desativar serviços desnecessários em ativos e software da empresa'
        },
        {
          id: 'conf9',
          text: '4.9.Configurar servidores DNS confiáveis em ativos corporativos'
        },
        {
          id: 'conf10',
          text: '4.10.Aplicar o bloqueio automático de dispositivos em dispositivos portáteis de usuário final'
        },
        {
          id: 'conf11',
          text: '4.11.Aplicar capacidade de apagamento remoto em dispositivos portáteis de usuário final'
        },
        {
          id: 'conf12',
          text: '4.12.Espaços de trabalho corporativos separados em dispositivos móveis de usuário final'
        }
      ]
    },
    {
      id: 'gestão',
      title: '5.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'gest1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'gest2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'gest3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'gest4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'gest5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'gest6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '6.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '7.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '8.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '9.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '10.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '11.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '12.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '13.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '14.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '15.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '16.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '17.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    },
    {
      id: 'malware',
      title: '18.Gestão de Contas',
      description: 'Usar processos e ferramentas para atribuir e gerenciar autorização para credenciais para contas de usuário, incluindo contas de administrador, bem como contas de serviço, para ativos corporativos e software.',
      icon: Zap,
      questions: [
        {
          id: 'mal1',
          text: '5.1.Estabelecer e manter um inventário de contas'
        },
        {
          id: 'mal2',
          text: '5.2.Usar senhas exclusivas'
        },
        {
          id: 'mal3',
          text: '5.3.Desativar contas inativas'
        },
        {
          id: 'mal4',
          text: '5.4.Restringir privilégios de administrador a contas de administrador dedicadas'
        },
        {
          id: 'mal5',
          text: '5.5.Estabelecer e manter um inventário de contas de serviço'
        },
        {
          id: 'mal6',
          text: '5.6.Centralizar o gerenciamento de contas'
        }
      ]
    }
  ];

  const getAnswerValue = (controlId: string, questionId: string): string => {
    const answer = answers.find(a => a.controlId === controlId && a.questionId === questionId);
    return answer?.value || '';
  };

  const setAnswer = (controlId: string, questionId: string, value: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => !(a.controlId === controlId && a.questionId === questionId));
      return [...filtered, { controlId, questionId, value }];
    });
  };

  const getControlProgress = (control: Control): number => {
    const answered = control.questions.filter(q => 
      getAnswerValue(control.id, q.id) !== ''
    ).length;
    return (answered / control.questions.length) * 100;
  };

  const getTotalProgress = (): number => {
    const totalQuestions = cisControls.reduce((sum, control) => sum + control.questions.length, 0);
    const answeredQuestions = answers.length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getControlStatus = (control: Control): 'complete' | 'partial' | 'empty' => {
    const progress = getControlProgress(control);
    if (progress === 100) return 'complete';
    if (progress > 0) return 'partial';
    return 'empty';
  };

  const handleSave = () => {
    // Simular salvamento
    alert('Progresso salvo com sucesso!');
  };

  const handleComplete = () => {
    const totalQuestions = cisControls.reduce((sum, control) => sum + control.questions.length, 0);
    if (answers.length === totalQuestions) {
      onNavigate('dashboard');
    } else {
      alert('Por favor, responda todas as perguntas antes de finalizar.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto"/>
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="border-l border-gray-300 pl-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Questionário de Maturidade CIS
              </h1>
              <p className="text-gray-600">
                Avalie o nível de implementação dos controles de segurança
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Progresso
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleComplete}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Finalizar Avaliação
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Barra de Progresso Global */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progresso Geral</h3>
              <span className="text-sm text-gray-600">{Math.round(getTotalProgress())}% concluído</span>
            </div>
            <Progress value={getTotalProgress()} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{answers.length} de {cisControls.reduce((sum, control) => sum + control.questions.length, 0)} perguntas respondidas</span>
              <span>{cisControls.filter(c => getControlStatus(c) === 'complete').length} de {cisControls.length} controles completos</span>
            </div>
          </CardContent>
        </Card>

        {/* Legenda */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Níveis de Maturidade:</h4>
            <div className="flex flex-wrap gap-3">
              {maturityLevels.map(level => (
                <Badge key={level.value} className={level.color}>
                  {level.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controles CIS */}
        <div className="space-y-4">
          <Accordion 
            type="multiple" 
            value={expandedItems}
            onValueChange={setExpandedItems}
            className="space-y-4"
          >
            {cisControls.map((control) => {
              const IconComponent = control.icon;
              const status = getControlStatus(control);
              const progress = getControlProgress(control);
              
              return (
                <AccordionItem key={control.id} value={control.id}>
                  <Card className={`transition-all ${
                    status === 'complete' ? 'border-green-200 bg-green-50' :
                    status === 'partial' ? 'border-yellow-200 bg-yellow-50' :
                    'border-gray-200'
                  }`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            status === 'complete' ? 'bg-green-100' :
                            status === 'partial' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              status === 'complete' ? 'text-green-600' :
                              status === 'partial' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{control.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {control.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{control.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{Math.round(progress)}%</p>
                            <Progress value={progress} className="w-20 h-2" />
                          </div>
                          {status === 'complete' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                          {status === 'partial' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-6 pt-4 space-y-6">
                        {control.questions.map((question) => (
                          <div key={question.id} className="border-l-4 border-gray-200 pl-4">
                            <div className="flex items-start gap-2 mb-3">
                              <h4 className="font-medium text-gray-900 flex-1">
                                {question.text}
                              </h4>
                              {question.helpText && (
                                <div className="group relative">
                                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                                  <div className="absolute bottom-6 right-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    {question.helpText}
                                  </div>
                                </div>
                              )}
                            </div>
                            <RadioGroup
                              value={getAnswerValue(control.id, question.id)}
                              onValueChange={(value) => setAnswer(control.id, question.id, value)}
                              className="grid grid-cols-2 md:grid-cols-4 gap-3"
                            >
                              {maturityLevels.map((level) => (
                                <div key={level.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={level.value} id={`${question.id}-${level.value}`} />
                                  <Label 
                                    htmlFor={`${question.id}-${level.value}`}
                                    className="text-sm cursor-pointer flex-1"
                                  >
                                    {level.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-center gap-4 mt-8 pb-8">
          <Button variant="outline" onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Salvar e Continuar Depois
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700" 
            onClick={handleComplete}
            size="lg"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Finalizar Avaliação
          </Button>
        </div>
      </div>
    </div>
  );
}