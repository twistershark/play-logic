import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const ActionContext = createContext();

const ActionProvider = ({ children }) => {
  const [mainVisual, setMainVisual] = useState([]);
  const [main, setMain] = useState([]);
  const [loop, setLoop] = useState([]);
  const [conditional, setConditional] = useState([]);
  const [counter, setCounter] = useState(0);
  const [id, setId] = useState(0);
  const [start, setStart] = useState(false);

  // Quando o usuário entrar na fase, tudo vai estar zerado

  useEffect(() => {
    setMainVisual([]);
    setMain([]);
    setLoop([]);
    setConditional([]);
  }, []);

  // Recebe o ID e a image da ação e adiciona no array das ações main
  const handleAddToMain = useCallback((action, image) => {
    if (counter < 8) {
      const updatedMain = main;
      updatedMain[counter] = { id, action, image };
      setId(id + 1);

      setMain(updatedMain);
      setMainVisual(updatedMain);
      setCounter(counter + 1);
    } else {
      setMain((prevState) => ([...prevState, { id, action, image }]));
    }
  }, [counter, main, id]);

  // Recebe o ID e a image da ação e adiciona no array das ações loop
  const handleAddToLoop = useCallback((action, image) => {
    if (loop.length < 4) {
      setLoop((prevState) => ([...prevState, { id, action, image }]));
      setId(id + 1);
    }
  }, [id, loop]);

  // Recebe o ID e a image da ação e adiciona no array das ações conditional
  const handleAddToConditional = useCallback((action, image) => {
    if (conditional.length < 4) {
      setConditional((prevState) => ([...prevState, { id, action, image }]));
      setId(id + 1);
    }
  }, [id, conditional]);

  // Adiciona as ações do loop na main TIMES vezes

  const handleAddLoopToMain = useCallback((times) => {
    for (let i = 1; i <= times; i + 1) {
      setMain((prevState) => ([...prevState, ...loop]));
    }
  }, [loop]);

  // Adiciona as ações do conditional na main.

  const handleAddConditionalToMain = useCallback(() => {
    setMain((prevState) => ([...prevState, ...conditional]));
  }, [conditional]);

  const handleShiftMain = useCallback(() => {
    const updatedMain = main;
    updatedMain.shift();
    setMain(updatedMain);
  }, [main]);

  // Reseta todos os arrays de ações
  const handleReset = useCallback(() => {
    setMain([]);
    setMainVisual([]);
    setLoop([]);
    setConditional([]);
    setCounter(0);
    setId(0);
  }, []);

  return (
    <ActionContext.Provider
      value={{
        main,
        loop,
        conditional,
        handleAddToMain,
        handleAddToLoop,
        handleAddToConditional,
        handleAddLoopToMain,
        handleAddConditionalToMain,
        handleReset,
        start,
        setStart,
        handleShiftMain,
        setMain,
        setMainVisual,
        mainVisual,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

function useAction() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error('useAction must be used within an ActionProvider');
  }

  return context;
}

export { useAction, ActionProvider };
