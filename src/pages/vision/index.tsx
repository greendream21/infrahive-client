import FooterPage from 'components/landingpage/Footer';
import React from 'react';
import AppBar from 'ui-component/extended/AppBar';

const Card = (props: { heading: string; desc: string; key: number }) => {
  return (
    <div key={props.key} className="p-6 bg-black text-white  rounded-lg">
      <h2 className="text-5xl text-infra-yellow">{props.heading}</h2>
      <p className="text-xl leading-relaxed">{props.desc}</p>
    </div>
  );
};

const index = () => {
  const CardData = [
    {
      heading: 'Integratable',
      desc: 'We are committed to enabling seamless integration of cutting-edge AI technologies into existing systems and workflows. Anyone can easily leverage the power of state-of-the-art AI models and unlock their full potential by just simple production-ready APIs'
    },
    {
      heading: 'Customisable',
      desc: 'We takes customizability to the next level, offering a platform that adapts to your unique needs. Now tailor the AI infrastructure to match your specific requirements from fine-tuning models, integrating proprietary algorithms, or creating bespoke workflows'
    },
    {
      heading: 'Privacy',
      desc: 'We prioritize the security and protection of your data, ensuring that privacy remains paramount throughout the AI journey. With stringent privacy measures in place, including data encryption, access controls, and compliance with data protection regulations, InfraHive provides a secure environment for AI development and deployment.'
    },
    {
      heading: 'Ethical AI',
      desc: 'We are dedicated to promoting ethical AI practices, ensuring fairness, transparency, and trustworthiness in every aspect. We prioritize the development of AI solutions that are free from biases, undesired outcomes, and discriminatory behaviors. Our platform integrates ethical guidelines and mechanisms to mitigate risks and promote responsible AI.'
    }
  ];
  return (
    <div>
      <AppBar />
      {/* Vision */}
      <div className=" py-24 mx-4">
        <div className="max-w-2xl lg:max-w-3xl mx-auto">
          <h1 className="text-5xl text-infra-yellow">vision</h1>
          <p className="text-xl leading-relaxed">
            We envision a future where accessing and utilizing cutting-edge AI technologies is seamless and accessible to all. We strive to
            empower innovation, simplify complex processes, and unlock the transformative potential of AI across industries.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className=" py-24 mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-xl lg:max-w-5xl mx-auto gap-6">
          {CardData.map((card, index) => (
            <Card heading={card.heading} desc={card.desc} key={index} />
          ))}
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default index;
