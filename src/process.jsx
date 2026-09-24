import { motion, useReducedMotion } from 'framer-motion';
import { Search, Settings, FileText, UsersRound } from 'lucide-react';
import './process.css';

export const processStages = [
  { number: '01', title: 'Discovery', icon: Search, description: 'We understand your goals, assess your needs and explore the right opportunities.' },
  { number: '02', title: 'Structuring', icon: Settings, description: 'We design a tailored strategy and structure the right solutions for your business and personal goals.' },
  { number: '03', title: 'Execution', icon: FileText, description: 'Our experts handle the complete implementation with precision and compliance.' },
  { number: '04', title: 'Ongoing Support', icon: UsersRound, description: 'We continue to support your growth with proactive guidance and long-term partnership.' },
];

function reveal(reduced, delay = 0) {
  return { initial: reduced ? false : { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay } };
}

function ProcessWaves() {
  return <svg className="process-waves" viewBox="0 0 2100 748" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="process-ice" x2="1" y2="1"><stop stopColor="#f6faff"/><stop offset=".55" stopColor="#e2f0ff"/><stop offset="1" stopColor="#c6e2ff"/></linearGradient>
      <linearGradient id="process-ribbon" x2=".8" y2="1"><stop stopColor="white" stopOpacity=".85"/><stop offset=".6" stopColor="white" stopOpacity=".12"/><stop offset="1" stopColor="#a9d3ff" stopOpacity=".25"/></linearGradient>
      <linearGradient id="process-white" x2="0" y2="1"><stop stopColor="white" stopOpacity=".75"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
    </defs>
    <path fill="url(#process-ice)" d="M0 0H2100V748H0z"/>
    <g fill="url(#process-ribbon)" stroke="#fff" strokeOpacity=".35">
      <path d="M0 85C360 140 590 10 1000 48S1630 151 2100 34V132C1740 52 1590 208 1140 158S410 109 0 229Z"/>
      <path d="M0 185C420 248 440 91 870 158S1530 261 2100 120V211C1660 321 1450 232 1020 216S397 376 0 280Z"/>
      <path d="M0 330C330 127 512 219 925 277S1620 424 2100 270V360C1720 517 1530 350 1120 335S401 280 0 464Z"/>
      <path d="M0 396C340 449 490 233 865 305S1600 520 2100 341V455C1620 596 1210 400 927 392S317 597 0 539Z"/>
      <path d="M0 575C375 547 559 759 960 640S1640 660 2100 479V609C1570 810 1210 653 925 721S300 653 0 673Z"/>
      <path d="M0 593C362 659 344 851 834 738S1540 766 2100 614V748H0Z"/>
    </g>
    <path fill="url(#process-white)" d="M0 269C390 81 658 355 1110 258S1720 129 2100 155V305C1630 270 1550 343 1110 309S423 155 0 329Z"/>
  </svg>;
}

export default function ProcessSection() {
  const reduced = useReducedMotion();
  return <section id="process" className="process-section relative isolate overflow-hidden" aria-labelledby="process-heading">
    <ProcessWaves />
    <div className="process-inner">
      <header className="process-intro text-center">
        <motion.p {...reveal(reduced)} className="process-eyebrow"><span aria-hidden="true"/>A SIMPLE, TRANSPARENT JOURNEY<span aria-hidden="true"/></motion.p>
        <motion.h2 {...reveal(reduced, .08)} id="process-heading">Our <em>Process</em></motion.h2>
        <motion.p {...reveal(reduced, .16)} className="process-description">A streamlined approach designed to make your business<br className="process-desktop-break"/> journey in the UAE simple, efficient and successful.</motion.p>
      </header>
      <motion.div {...reveal(reduced, .12)} className="process-timeline">
        <div className="process-panel" aria-hidden="true"/>
        <svg className="process-connector" preserveAspectRatio="none" aria-hidden="true">
          <motion.line x1="0" y1="50%" x2="100%" y2="50%" initial={reduced ? false : {pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:1,delay:.25}}/>
        </svg>
        <svg className="process-connector-mobile" preserveAspectRatio="none" aria-hidden="true">
          <motion.line x1="50%" y1="0" x2="50%" y2="100%" initial={reduced ? false : {pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:1}}/>
        </svg>
        <div className="process-nodes" aria-hidden="true"><i/><i/><i/></div>
        <ol className="process-grid grid">
          {processStages.map((stage, index) => {
            const Icon = stage.icon;
            return <li className="process-stage" key={stage.number}>
              <motion.div {...reveal(reduced, .15 + index * .12)} className="process-number">{stage.number}</motion.div>
              <motion.div className="process-icon-reveal" initial={reduced ? false : {opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.45,delay:.25 + index * .12}}>
                <div className="process-icon"><Icon size={38} strokeWidth={1.65} aria-hidden="true"/></div>
              </motion.div>
              <motion.div {...reveal(reduced, .3 + index * .12)} className="process-copy"><h3>{stage.title}</h3><p>{stage.description}</p></motion.div>
            </li>;
          })}
        </ol>
      </motion.div>
    </div>
  </section>;
}
