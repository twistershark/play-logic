import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const ActionContext = createContext();

const ActionProvider = ({ children }) => {
  const [main, setMain] = useState([]);
  const [loop, setLoop] = useState([]);
  const [counter, setCounter] = useState(0);
  const [id, setId] = useState(0);
  const [start, setStart] = useState(false);

  // Quando o usuário entrar na fase, tudo vai estar zerado

  useEffect(() => {
    setMain([]);
    setLoop([]);
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
    if (loop.length < 4) {
      const updatedLoop = loop;
      loop.push({
        id,
        action,
        image,
      });
      setLoop(updatedLoop);
      setId(id + 1);
    }
  }, [id, loop]);

  // Adiciona as ações do loop na main TIMES vezes

  const handleAddLoopToMain = useCallback(() => {
    const loopActions = loop.map((loop) => {
      setId(id + 1);
      return ({
        id: id - 1,
        action: loop.action,
        image: loop.image,
      });
    });

    setMain((prevState) => ([...prevState, ...loopActions]));
  }, [loop, id]);

  const handleShiftMain = useCallback(() => {
    const updatedMain = main;
    updatedMain.shift();
    setMain(updatedMain);
  }, [main]);

  // Reseta todos os arrays de ações
  const handleReset = useCallback(() => {
    setMain([]);
    setLoop([]);
    setCounter(0);
    setId(0);
  }, []);

  return (
    <ActionContext.Provider
      value={{
        main,
        loop,
        handleAddToMain,
        handleAddToLoop,
        handleAddLoopToMain,
        handleReset,
        start,
        setStart,
        handleShiftMain,
        setMain,
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
