<>
  <InputArea>
    <Label>Children</Label>
    <FlexWrapper>
      <SelectChild
        id="SelectChild"
        value={inputChild}
        onChange={e => {
          setInputChild(e.target.value);
        }}
      >
        {memoryLinks
          .filter(ml => !inputChildren.some(c => c === ml.name.toLowerCase()))
          .map(ml => (
            <option key={ml.name} value={ml.name}>
              {ml.name}
            </option>
          ))}
      </SelectChild>
      <AddButton
        onClick={() => {
          inputChild &&
            !inputChildren.find(child => child === inputChild.toLowerCase()) &&
            setInputChildren([...inputChildren, inputChild.toLowerCase()]);

          setInputChild(
            memoryLinks.find(
              l => !inputChildren.find(child => child === l.name.toLowerCase())
            )
              ? memoryLinks.find(
                  l =>
                    !inputChildren.find(child => child === l.name.toLowerCase())
                ).name
              : memoryLinks[0].name
          );
          setInputParents(
            inputParents.filter(parent => parent !== inputChild.toLowerCase())
          );
          document.getElementById('SelectChild').focus();
        }}
      >
        +
      </AddButton>
    </FlexWrapper>
    <Tags>
      {inputChildren &&
        inputChildren.map(child => (
          <Tag
            key={child}
            onClick={e => {
              setInputChildren(
                inputChildren.filter(
                  child =>
                    child !==
                    e.target.innerText.substring(
                      0,
                      e.target.innerText.length - 2
                    )
                )
              );
              setInputChild(inputChildren.find(child => child !== inputChild));
              document.getElementById('SelectChild').focus();
            }}
          >
            {child} &times;
          </Tag>
        ))}
    </Tags>
  </InputArea>
  <InputArea>
    <Label>Parents</Label>
    <FlexWrapper>
      <SelectParent
        id="SelectParent"
        value={inputParent}
        onChange={e => {
          setInputParent(e.target.value);
        }}
      >
        {memoryLinks
          .filter(ml => !inputParents.some(p => p === ml.name.toLowerCase()))
          .map(ml => (
            <option key={ml.name} value={ml.name}>
              {ml.name}
            </option>
          ))}
      </SelectParent>
      <AddButton
        onClick={() => {
          inputParent &&
            !inputParents.find(
              parent => parent === inputParent.toLowerCase()
            ) &&
            setInputParents([...inputParents, inputParent.toLowerCase()]);

          setInputParent(
            memoryLinks.find(
              l => !inputParents.find(parent => parent === l.name.toLowerCase())
            )
              ? memoryLinks.find(
                  l =>
                    !inputParents.find(
                      parent => parent === l.name.toLowerCase()
                    )
                ).name
              : memoryLinks[0].name
          );
          setInputChildren(
            inputChildren.filter(child => child !== inputParent.toLowerCase())
          );

          document.getElementById('SelectParent').focus();
        }}
      >
        +
      </AddButton>
    </FlexWrapper>
    <Tags>
      {inputParents &&
        inputParents.map(parent => (
          <Tag
            key={parent}
            onClick={e => {
              setInputParents(
                inputParents.filter(
                  parent =>
                    parent !==
                    e.target.innerText.substring(
                      0,
                      e.target.innerText.length - 2
                    )
                )
              );
              setInputParent(
                inputParents.find(parent => parent !== inputParent)
              );
              document.getElementById('SelectParent').focus();
            }}
          >
            {parent} &times;
          </Tag>
        ))}
    </Tags>
  </InputArea>
</>;
