import { useState, useEffect } from "react";

import Select from "react-select";

const Tags = ({ tags }) => {
  const listStyle = {
    height: "300px",
    overflow: "auto",
  };

  const itemStyle = {
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
  };

  return (
    <>
      <div>タグ一覧</div>
      <ul className="list-group" style={listStyle}>
        {tags.map((tag) => (
          <li className="list-group-item" style={itemStyle} key={tag.value}>
            {tag.label}
          </li>
        ))}
      </ul>
    </>
  );
};

const RegisterTag = ({ tags, setTags }) => {
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tag.length <= 0) {
      console.error("タグ名を入力してください！");
      return;
    }

    const newTag = {
      label: tag,
      value: tags.length + 1,
    };
    setTags((tags) => [...tags, newTag]);

    setTag("");
  };

  return (
    <div className="row">
      <div className="col-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">タグ登録</label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="タグ名"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            登録
          </button>
        </form>
      </div>
      <div className="col-6">
        <Tags tags={tags} />
      </div>
    </div>
  );
};

const RegisterEvent = ({ tags, setEvents }) => {
  const initEvent = { name: "", tags: [] };

  const [selectTag, setSelectTag] = useState([]);
  const [event, setEvent] = useState(initEvent);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (event.name.length <= 0) {
      console.error("イベント名を入力してください！");
      return;
    }

    setEvents((events) => [...events, { ...event, tags: selectTag }]);

    setEvent(initEvent);
    setSelectTag([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail2">イベント登録</label>
        <input
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="イベント名"
          value={event.name}
          onChange={(e) =>
            setEvent((event) => ({ ...event, name: e.target.value }))
          }
        />
      </div>
      <div>
        <Select
          isMulti
          name="tags"
          options={tags}
          className="basic-multi-select"
          classNamePrefix="select"
          closeMenuOnSelect={false}
          value={selectTag}
          onChange={(value) => {
            setSelectTag(value);
          }}
        />
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          登録
        </button>
      </div>
    </form>
  );
};

const Events = ({ tags, events }) => {
  // TODO: タグ変更時に loading を挟むべき

  const [selectTags, setSelectTags] = useState([]);

  const TableRows = ({ events }) => {
    const valuesOfSelectTags = selectTags.map((tag) => {
      return tag.value;
    });

    let newEvents = events;

    // タグ指定がある場合のみ絞り込み
    if (valuesOfSelectTags.length > 0) {
      newEvents = newEvents.filter((currentValue, index, array) => {
        const valuesOfEventTags = currentValue.tags.map((tag) => {
          return tag.value;
        });

        const diffTags = valuesOfSelectTags.filter(
          (tagValue) => valuesOfEventTags.indexOf(tagValue) === -1
        );

        // 0 以下ならば選択した絞り込みタグをすべて含むため抽出対象
        // 0 超過ならば選択した絞り込みタグを含んでいないため抽出対象外
        if (diffTags.length <= 0) {
          return true;
        }
        return false;
      });
    }

    return newEvents.map((event, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{event.name}</td>
        <td>
          <div className="h5">
            {event.tags.map((tag) => (
              <span
                className="badge badge-pill badge-secondary mx-1"
                key={tag.value}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div>イベント一覧</div>
      <div className="mt-3">
        <Select
          isMulti
          name="tags"
          options={tags}
          className="basic-multi-select"
          classNamePrefix="select"
          closeMenuOnSelect={false}
          value={selectTags}
          onChange={(value) => {
            setSelectTags(value);
          }}
        />
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">イベント名</th>
            <th scope="col">タグ</th>
          </tr>
        </thead>
        <tbody>
          <TableRows events={events} />
        </tbody>
      </table>
    </>
  );
};

const Sample1 = () => {
  const initTags = [
    { value: 1, label: "2000年生まれ" },
    { value: 2, label: "2001年生まれ" },
    { value: 3, label: "2002年生まれ" },
    { value: 4, label: "北海道" },
    { value: 5, label: "岩手" },
    { value: 6, label: "秋田" },
    { value: 7, label: "男" },
    { value: 8, label: "女" },
    { value: 9, label: "男女以外" },
    { value: 10, label: "社会人" },
    { value: 11, label: "学生" },
    { value: 12, label: "幼児" },
  ];

  const event1 = {
    name: "イベント１",
    tags: [initTags[0], initTags[3], initTags[6], initTags[9]],
  };
  const event2 = {
    name: "イベント２",
    tags: [initTags[1], initTags[4], initTags[7], initTags[10]],
  };
  const event3 = {
    name: "イベント３",
    tags: [initTags[2], initTags[5], initTags[8], initTags[11]],
  };
  const event4 = {
    name: "イベント４",
    tags: [
      initTags[0],
      initTags[1],
      initTags[2],
      initTags[3],
      initTags[4],
      initTags[5],
      initTags[6],
      initTags[7],
      initTags[8],
      initTags[9],
      initTags[10],
      initTags[11],
    ],
  };

  const [tags, setTags] = useState(initTags);
  const [events, setEvents] = useState([event1, event2, event3, event4]);

  return (
    <>
      <div className="container pb-5">
        <div className="mt-3">
          <RegisterTag tags={tags} setTags={setTags} />
        </div>
        <hr className="mt-5" />
        <div>
          <RegisterEvent tags={tags} setEvents={setEvents} />
        </div>
        <hr className="mt-5" />
        <div>
          <Events tags={tags} events={events} />
        </div>
      </div>
    </>
  );
};

export default Sample1;
