import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaDePrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-primary mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground mb-6">Última atualização: 21 de setembro de 2025</p>

          <div className="space-y-6 text-card-foreground">
            <p>
              A sua privacidade é importante para nós. É política do PraiAtiva respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site PraiAtiva.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">1. Informações que Coletamos</h2>
            <p>
              Coletamos informações pessoais que você nos fornece diretamente ao se cadastrar e usar nossa plataforma. As informações incluem:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Dados de Identificação:</strong> Nome completo e endereço de e-mail.</li>
              <li><strong>Dados de Contato:</strong> Número de telefone/WhatsApp (opcional).</li>
              <li><strong>Dados de Autenticação:</strong> Senha (criptografada).</li>
              <li><strong>Dados de Perfil:</strong> Tipo de usuário (aluno ou instrutor) e apresentação profissional/biografia (opcional).</li>
            </ul>
            <p>
              Também coletamos dados automaticamente quando você navega no site, como endereço IP, tipo de navegador, páginas acessadas e tempo de permanência, para fins de análise e melhoria do serviço.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">2. Como Usamos as Suas Informações</h2>
            <p>
              Usamos as informações que coletamos para:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Operar e manter nossa plataforma.</li>
              <li>Criar e gerenciar sua conta de usuário.</li>
              <li>Conectar alunos e instrutores para a realização de atividades.</li>
              <li>Personalizar sua experiência e responder às suas solicitações.</li>
              <li>Enviar comunicações importantes sobre o serviço, como atualizações e alertas de segurança.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-6">3. Compartilhamento de Informações</h2>
            <p>
              Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Com o seu consentimento:</strong> Podemos compartilhar informações quando você nos autoriza.</li>
              <li><strong>Para Processamento Externo:</strong> Utilizamos o Supabase como nosso provedor de infraestrutura de banco de dados e autenticação. Eles processam seus dados em nosso nome, seguindo nossas instruções e esta Política de Privacidade.</li>
              <li><strong>Por Motivos Legais:</strong> Se acreditarmos de boa-fé que o acesso, uso, preservação ou divulgação das informações é razoavelmente necessário para cumprir uma lei, regulamentação, processo legal ou solicitação governamental.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-6">4. Seus Direitos (LGPD)</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Confirmar a existência de tratamento de seus dados.</li>
              <li>Acessar seus dados a qualquer momento.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
              <li>Solicitar a portabilidade dos seus dados a outro fornecedor de serviço.</li>
              <li>Eliminar os dados pessoais tratados com o seu consentimento.</li>
              <li>Obter informação sobre as entidades com as quais compartilhamos seus dados.</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato conosco através do e-mail: <a href="mailto:praiativaops@gmail.com" className="text-primary hover:underline">praiativaops@gmail.com</a>.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">5. Segurança dos Dados</h2>
            <p>
              Empregamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais. Usamos criptografia para senhas e conexões seguras (SSL/TLS). No entanto, nenhum método de transmissão pela Internet ou de armazenamento eletrônico é 100% seguro.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">6. Alterações a Esta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações, publicando a nova política nesta página e atualizando a data da "Última atualização".
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-6">7. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco: <a href="mailto:praiativaops@gmail.com" className="text-primary hover:underline">praiativaops@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;