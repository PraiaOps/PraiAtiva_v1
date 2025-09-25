import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermosDeUso = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-primary mb-4">Termos de Uso</h1>
          <p className="text-muted-foreground mb-6">Última atualização: 21 de setembro de 2025</p>

          <div className="space-y-6 text-card-foreground">
            <p>
              Bem-vindo ao PraiAtiva! Estes Termos de Uso governam o seu acesso e uso da nossa plataforma que conecta alunos e instrutores de atividades de praia. Ao se cadastrar ou usar nossos serviços, você concorda em cumprir estes termos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">1. O Serviço PraiAtiva</h2>
            <p>
              O PraiAtiva é uma plataforma online que serve como intermediária para que usuários (Alunos) encontrem e se conectem com prestadores de serviços de atividades físicas e de lazer na praia (Instrutores). Não empregamos os instrutores nem nos responsabilizamos pela execução ou qualidade das atividades.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">2. Contas de Usuário</h2>
            <p>
              Para acessar a maioria dos recursos, você deve se registrar e criar uma conta. Você concorda em fornecer informações precisas, atuais e completas durante o processo de registro. Você é responsável por proteger sua senha e por todas as atividades que ocorram em sua conta.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">3. Conduta e Responsabilidades</h2>
            <p><strong>Instrutores:</strong></p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Declaram possuir as qualificações, licenças e seguros necessários para oferecer as atividades cadastradas.</li>
              <li>São os únicos responsáveis pela segurança, qualidade e execução de suas aulas e atividades.</li>
              <li>Concordam em não transmitir informações falsas ou enganosas na plataforma.</li>
            </ul>
            <p className="mt-4"><strong>Alunos:</strong></p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Declaram estar em condições de saúde adequadas para participar das atividades escolhidas.</li>
              <li>Concordam em seguir as instruções de segurança fornecidas pelos instrutores.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-6">4. Isenção de Responsabilidade</h2>
            <p>
              O PraiAtiva atua apenas como um facilitador. Não somos parte do contrato entre aluno e instrutor. Portanto, na extensão máxima permitida pela lei, o PraiAtiva não se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequenciais, incluindo, mas não se limitando a, lesões corporais, danos materiais ou perdas financeiras que possam ocorrer durante as atividades agendadas através da plataforma.
            </p>
            <p>
              A veracidade das informações fornecidas pelos instrutores, bem como sua qualificação profissional, é de responsabilidade exclusiva dos mesmos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma, incluindo o nome PraiAtiva, logotipo, design, textos e gráficos, é de nossa propriedade exclusiva ou de nossos licenciadores e é protegido por leis de direitos autorais e propriedade intelectual. Você não pode usar, copiar ou distribuir qualquer conteúdo da plataforma sem nossa permissão prévia por escrito.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">6. Modificações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Se fizermos alterações, publicaremos os termos revisados no site e atualizaremos a data da "Última atualização". O uso continuado da plataforma após tais alterações constitui sua aceitação dos novos termos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">7. Lei Aplicável</h2>
            <p>
              Estes Termos de Uso serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Fica eleito o foro da comarca de Niterói, Rio de Janeiro, para dirimir quaisquer controvérsias oriundas destes termos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">8. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco: <a href="mailto:praiativaops@gmail.com" className="text-primary hover:underline">praiativaops@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
