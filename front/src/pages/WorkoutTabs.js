

import './WorkoutTabs.css'

import React, { useState } from "react";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import './WorkoutTabs.css'

const MenuItem = ({ text, selected }) => {
    return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = (list, selected) =>
    list.map(el => {
        const { name } = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

const WorkoutsPage = ({ appData, handleCurrentTab }) => {
    const [state, setState] = useState({
        alignCenter: true,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: true,
        hideSingleArrow: true,
        itemsCount: appData.workout_menus.length,
        scrollToSelected: false,
        selected: "For You",
        translate: 0,
        transition: 0.3,
        wheel: true
    })
    let list = [
        { name: "For You" },
        { name: "Popular" },
        { name: "Interval" },
        { name: "Muscle" },
        { name: "Strength" },
        { name: "Full body" },
        { name: "Upper Body" },
        { name: "Lower Body" },
    ]

    let menu = null
    let menuItems = Menu(list.slice(0, list.length), state.selected)

    const onFirstItemVisible = () => {
        console.log("first item is visible")
    }

    const onLastItemVisible = () => {
        console.log("last item is visible")

        const newItems = Array(5)
            .fill(1)
            .map((el, ind) => ({ name: `item${list.length + ind + 1}` }))
        list = list.concat(newItems)
        menuItems = Menu(list, list.slice(-1)[0].name);
        setState({
            ...state,
            itemsCount: list.length,
            selected: state.selected
        })
    }

    const onUpdate = ({ translate }) => {
        console.log(`onUpdate: translate: ${translate}`);
        setState({ ...state,translate });
    };

    const onSelect = key => {
        console.log(`onSelect: ${key}`);
        handleCurrentTab(key)
        setState({ ...state,selected: key });
    };

    const componentDidUpdate = (prevProps, prevState) => {
        const { alignCenter } = prevState;
        const { alignCenter: alignCenterNew } = state;
        if (alignCenter !== alignCenterNew) {
            menu.setInitial();
        }
    }

    const setItemsCount = ev => {
        const { itemsCount = list.length, selected } = state;
        const val = +ev.target.value;
        const itemsCountNew =
            !isNaN(val) && val <= list.length && val >= 0
                ? +ev.target.value
                : list.length;
        const itemsCountChanged = itemsCount !== itemsCountNew;

        if (itemsCountChanged) {
            menuItems = Menu(list.slice(0, itemsCountNew), selected);
            setState({
                ...state,itemsCount: itemsCountNew
            });
        }
    };

    const setSelected = ev => {
        const { value } = ev.target;
        setState({ ...state,selected: String(value) });
    }

    menu = menuItems
    const {
        alignCenter,
        clickWhenDrag,
        hideArrows,
        dragging,
        hideSingleArrow,
        itemsCount,
        scrollToSelected,
        selected,
        translate,
        transition,
        wheel
    } = state

    const checkboxStyle = {
        margin: "5px 10px"
    };
    const valueStyle = {
        margin: "5px 10px",
        display: "inline-block"
    }

    return (
        <div className="App" style={{ color: 'white' }}>

            <ScrollMenu
                alignCenter={alignCenter}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                clickWhenDrag={clickWhenDrag}
                data={menu}
                dragging={dragging}
                hideArrows={hideArrows}
                hideSingleArrow={hideSingleArrow}
                onFirstItemVisible={onFirstItemVisible}
                onLastItemVisible={onLastItemVisible}
                onSelect={onSelect}
                onUpdate={onUpdate}
                ref={el => (menu = el)}
                scrollToSelected={scrollToSelected}
                selected={selected}
                transition={+transition}
                translate={translate}
                wheel={wheel}
            />

        </div>
    )
}

export default WorkoutsPage