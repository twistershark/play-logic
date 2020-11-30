import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const ActionContext = createContext();

const nullData = [
  { id: 0, image: undefined },
  { id: 1, image: undefined },
  { id: 2, image: undefined },
  { id: 3, image: undefined },
  { id: 4, image: undefined },
  { id: 5, image: undefined },
  { id: 6, image: undefined },
  { id: 7, image: undefined },
];

const ActionProvider = ({ children }) => {
  const [main, setMain] = useState([]);
  const [loop, setLoop] = useState([]);
  const [conditional, setConditional] = useState([]);
  const [counter, setCounter] = useState(0);
  const [id, setId] = useState(0);

  // Quando o usuário entrar na fase, tudo vai estar zerado

  useEffect(() => {
    setMain(nullData);
    setLoop([]);
    setConditional([]);
    setCounter(0);
    setId(0);
  }, []);

  // Recebe o ID e a image da ação e adiciona no array das ações main
  const handleAddToMain = useCallback((action, image) => {
    if (counter < 8) {
      const updatedMain = main;
      updatedMain[counter] = { id, action, image };
      setId(id + 1);

      setMain(updatedMain);
      setCounter(counter + 1);
    } else {
      setMain((prevState) => ([...prevState, { id, action, image }]));
    }
  }, [counter, main, id]);

  // Recebe o ID e a image da ação e adiciona no array das ações loop
  const handleAddToLoop = useCallback((action, image) => {
    setLoop((prevState) => ([...prevState, { id, action, image }]));
    setId(id + 1);
  }, [id]);

  // Recebe o ID e a image da ação e adiciona no array das ações conditional
  const handleAddToConditional = useCallback((action, image) => {
    setConditional((prevState) => ([...prevState, { id, action, image }]));
    setId(id + 1);
  }, [id]);

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

  // Reseta todos os arrays de ações
  const handleReset = useCallback(() => {
    setMain(nullData);
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
